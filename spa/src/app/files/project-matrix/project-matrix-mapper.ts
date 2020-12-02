/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Utility class that maps project matrix values received from Azul in a tree format into a set of matrix file view
 * models, including their corresponding meta.
 */

// App dependencies
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { ProjectMatrixFileShortNamePipe } from "../project-matrix-file-short-name/project-matrix-file-short-name.pipe";
import { MatrixResponseFile } from "./project-matrix-response-file.model";
import { ProjectMatrixView } from "./project-matrix-view.model";

export class ProjectMatrixMapper {

    // Locals
    private projectMatrixFileShortNamePipe = new ProjectMatrixFileShortNamePipe();
    
    /**
     * Convert matrices tree structure into set of rows representing matrix files and their corresponding values.
     * 
     * @param {any} responseTree
     * @returns {ProjectMatrixView[]}
     */
    public bindMatrices(responseTree = {}): ProjectMatrixView[] {

        const matrixViews = this.flattenResponseTree(responseTree);
        const viewModels = this.mergeDuplicatedMatrixViews(matrixViews);
        this.sortMatrixViewsMeta(viewModels);
        this.sortMatrixViews(viewModels);

        return viewModels;
    }

    /**
     * Create a matrix view from the specified matrix file response format and the collated meta for the file.
     *
     * @param {MatrixResponseFile} file
     * @param {{[key: string]: string}} meta
     * @returns {ProjectMatrixView}
     */
    private createMatrixView(file: MatrixResponseFile, meta: {[key: string]: string}): ProjectMatrixView {

        // Create matrix view, starting with core file values.
        const {url, name} = file;
        const matrixView =  {
            fileName: name,
            shortName: this.projectMatrixFileShortNamePipe.transform(name),
            url
        };

        // Convert meta values into arrays. There may be identical files in separate branches of the tree and we'll
        // collate and merge the meta for each duplicated file specifications into an array. It is also possible that a 
        // meta value is a comma-separated value: split, trim and add as individual values.
        for ( let [key, value] of Object.entries(meta) ) {

            matrixView[key] = value.split(",").map(v => v.trim());
        }

        return matrixView;
    }


    /**
     * Create matrix views for the specified set of matrix file response format.
     * 
     * @param {MatrixResponseFile[]} files
     * @param {{[key: string]: string}} meta
     * @returns {ProjectMatrixView[]}
     */
    private createMatrixViews(files: MatrixResponseFile[], meta: {[key: string]: string}): ProjectMatrixView[] {
        
        return files.map(file => {
            return this.createMatrixView(file, meta);
        });
    }

    /**
     * Convert matrices tree into a row format: one row per file. Files with identical URLs but different tags are
     * represented in separate rows and must be merged/de-duped (at a later stage).
     *
     * @param {any} tree - either object containing key/child node structure, or array if at leaf
     * @param {any} meta - set of tags associated with depth-first, postorder traversal of tree
     * @param {any[]} views - file objects flattened from depth-first, postorder, traversal of tree
     */
    private flattenResponseTree(tree, meta = {}, views = []): ProjectMatrixView[] {

        // If we've got an array, we're at the files leaf; create views for each file.
        if ( Array.isArray(tree) ) {
            views.push(...this.createMatrixViews(tree, meta));
            return;
        }

        // Otherwise, continue traversing tree.
        for ( let [key, value] of Object.entries(tree) ) {

            if ( typeof value !== "object" || value === null ) {
                continue;
            }

            // Grab the key/value pair values for the current key. Add any keys as a value for the current key, branch
            // meta and repeat. For example, given { ..."libraryConstructionApproach": {"10x": { "stage": ...} } where 
            // libraryConstructionApproach is the current key, we must add 10x as a value for libraryConstructionApproach
            // and continue on to the next depth level in the tree.
            for ( let [nextKey, nextSubtree] of Object.entries(value as any) ) {
                const branchedMeta = {...meta};
                branchedMeta[key] = nextKey;
                this.flattenResponseTree(nextSubtree, branchedMeta, views);
            }
        }

        return views;
    }

    /**
     * Merge files that appeared more than once in the tree.
     *
     * @param {ProjectMatrixView[]} viewToMerge
     * @param {ProjectMatrixView} mergeWithView
     * @returns {ProjectMatrixView[]}
     */
    private mergeDuplicatedMatrixView(viewToMerge: ProjectMatrixView, mergeWithView: ProjectMatrixView): ProjectMatrixView {

        // Create new view - for immutability - to hold merged values.
        const mergedView = {
            fileName: mergeWithView.fileName,
            shortName: mergeWithView.shortName,
            url: mergeWithView.url
        };
        
        for ( let [key, value] of Object.entries(viewToMerge) ) {

            // Ignore core, non-meta, file values: these values are constant across all files and don't need to be merged.
            // That is, fileName, shortName and url. We can assume non-array values are core values.
            if ( !Array.isArray(value) ) {
                continue;
            }
            
            // Add values, if they exist, from both the view to merge with and the view that we are attempting to merge.
            const mergedMeta = new Set<string>([
                ...mergeWithView[key] || [],
                ...value || []
            ]);
            mergedView[key] = Array.from(mergedMeta.values());
        }
        
        return mergedView;
    }

    /**
     * Merge files that appeared more than once in the tree.
     *
     * @param {ProjectMatrixView[]} matrixViews
     * @returns {ProjectMatrixView[]}
     */
    private mergeDuplicatedMatrixViews(matrixViews: ProjectMatrixView[]): ProjectMatrixView[] {

        const viewsByUrl = matrixViews.reduce((accum, matrixView) => {

            const {url} = matrixView;

            // Check if we have already added a matrix view for this file and if so, merge meta of views. 
            if ( accum.has(url) ) {
                const mergeWith = accum.get(url);
                accum.set(url, this.mergeDuplicatedMatrixView(matrixView, mergeWith));
            }
            // Otherwise a matrix view has not yet been added for this file, add this as the first. 
            else {
                accum.set(url, matrixView);
            }

            return accum;
        }, new Map<string, ProjectMatrixView>());

        return Array.from(viewsByUrl.values());
    }

    /**
     * Sort matrix views by display columns: species, organ, library construction approach, file name.
     * 
     * @param {ProjectMatrixView[]} matrixViews
     */
    private sortMatrixViews(matrixViews: ProjectMatrixView[]) {
        
        matrixViews.sort((view0, view1) => {

            // Sort by species
            const species0 = (view0[FileFacetName.GENUS_SPECIES] || []).join("");
            const species1 = (view1[FileFacetName.GENUS_SPECIES] || []).join("");
            if ( species0 > species1 ) {
                return 1;
            }
            else if ( species0 < species1 ) {
                return -1;
            }
            
            // Sort by organ
            const organ0 = (view0[FileFacetName.ORGAN] || []).join("");
            const organ1 = (view1[FileFacetName.ORGAN] || []).join("");
            if ( organ0 > organ1 ) {
                return 1;
            }
            else if ( organ0 < organ1 ) {
                return -1;
            }

            // Sort by library construction approach
            const lca0 = (view0[FileFacetName.LIBRARY_CONSTRUCTION_APPROACH] || []).join("");
            const lca1 = (view1[FileFacetName.LIBRARY_CONSTRUCTION_APPROACH] || []).join("");
            if ( lca0 > lca1 ) {
                return 1;
            }
            else if ( lca0 < lca1 ) {
                return -1;
            }

            // Sort by file short name
            const shortName0 = view0.shortName;
            const shortName1 = view1.shortName;
            if ( shortName0 > shortName1 ) {
                return 1;
            }
            else if ( shortName0 < shortName1 ) {
                return -1;
            }
            
            return 0;
        });
    }
    
    /**
     * Sort meta values of file view model.
     * 
     * @param {ProjectMatrixView[]} matrixViews
     */
    private sortMatrixViewsMeta(matrixViews: ProjectMatrixView[]) {

        matrixViews.forEach(matrixView => {

            Object.values(matrixView).forEach(value => {

                if ( Array.isArray(value) ) {
                    value.sort();
                }
            });
        });
    }
}

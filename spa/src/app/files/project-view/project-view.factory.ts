/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Factory coordinating the project-view build.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { Catalog } from "../catalog/catalog.model";
import { CollaboratingOrganizationView } from "./collaborating-organization-view.model";
import { DCPCatalog } from "../catalog/dcp-catalog.model";
import { ConfigService } from "../../config/config.service";
import { ContactView } from "./contact-view.model";
import { ContributorView } from "./contributor-view.model";
import { CountSizePipe } from "../../pipe/count-size/count-size.pipe";
import { LocaleStringPipe } from "../../pipe/locale-string/locale-string.pipe";
import { ProjectView } from "./project-view.model";
import { Contributor } from "../shared/contributor.model";
import { KeyValuePair } from "../../shared/key-value-pair/key-value-pair.model";
import { Project } from "../shared/project.model";

@Injectable()
export class ProjectViewFactory {
    // Template variables
    private DATA_SUMMARY_NULL_VALUE_TO_DISPLAY_VALUE = {
        libraryConstructionApproach: "-",
        pairedEnd: "-",
    };
    private ACCEPT_LIST_DATA_SUMMARY_TO_KEY = {
        projectShortname: "",
        genusSpecies: "",
        sampleEntityType: "",
        organ: "",
        organPart: "",
        selectedCellType: "",
        modelOrgan: "",
        disease: "",
        donorDisease: "",
        developmentStage: "",
        libraryConstructionApproach: "",
        nucleicAcidSource: "",
        pairedEnd: "",
        workflow: "",
        fileType: "fileFormat",
        totalCells: "",
        donorCount: "",
    };

    /**
     * @param {ConfigService} configService
     */
    public constructor(private configService: ConfigService) {}

    /**
     * Returns project related information, including formatted contact, contributor and organizations lists.
     *
     * @param {Catalog} catalog
     * @param {Project} project
     * @returns {ProjectView}
     */
    public getProjectView(catalog: Catalog, project: Project): ProjectView {
        return {
            accessions: this.buildAccessions(project),
            citationLink: this.buildCitationUrl(catalog, project.entryId),
            collaboratingOrganizations: this.buildCollaboratingOrganizations(
                project.contributors
            ),
            contacts: this.buildContacts(project.contributors),
            contributors: this.buildContributors(project.contributors),
            dataCurators: this.buildDataCurators(project.contributors),
            dataSummaries: this.buildDataSummaries(project),
            fileTypeCounts: this.buildFileTypeCounts(project),
        };
    }

    /**
     * Returns accessions converted to key value pairs.
     *
     * @param {Project} project
     * @returns {KeyValuePair[]}
     */
    private buildAccessions(project: Project): KeyValuePair[] {
        const pairs = [];
        for (let [label, accessions] of project.accessionsByLabel.entries()) {
            // Create view models for each accession value
            const accessionViews = accessions.map((accession) => {
                const { id, url } = accession;
                return {
                    key: id,
                    value: url,
                };
            });

            pairs.push({
                key: label,
                value: accessionViews,
            });
        }

        return pairs;
    }

    /**
     * Returns project detail page url.
     *
     * @param {Catalog} catalog
     * @param {string} projectId
     * @returns {string}
     */
    private buildCitationUrl(catalog: Catalog, projectId: string): string {
        // Add selected project to state - grab the project ID from the URL.
        const browserURL = this.configService.getBrowserUrl();
        const citationURL = `${browserURL}/explore/projects/${projectId}`;

        // Return citation with catalog param if viewing dcp1.
        if (catalog === DCPCatalog.DCP1) {
            return `${citationURL}?catalog=${catalog}`;
        }

        return citationURL;
    }

    /**
     * Returns the project contributor's list of organizations with their corresponding citation.
     *
     * @param {Contributor[]} contributors
     * @returns {CollaboratingOrganizationView[]}
     */
    private buildCollaboratingOrganizations(
        contributors: Contributor[]
    ): CollaboratingOrganizationView[] {
        const projectContributors =
            this.filterContributorsWithProjectContributors(contributors);

        const contributorOrganizations = new Set(
            this.getCollaboratingOrganizations(projectContributors)
        );

        return [...contributorOrganizations].map((organization, i) => {
            return {
                citation: i + 1,
                name: organization,
            };
        });
    }

    /**
     * Returns formatted project contacts.
     *
     * @param {Contributor[]} contributors
     * @returns {ContactView[]}
     */
    private buildContacts(contributors: Contributor[]): ContactView[] {
        return contributors
            .filter((contributor) => contributor.correspondingContributor)
            .map((correspondingContributor) => {
                return {
                    name: this.formatContributor(
                        correspondingContributor.contactName
                    ),
                    email: correspondingContributor.email,
                    institution: correspondingContributor.institution,
                };
            });
    }

    /**
     * Returns formatted project contributors with their corresponding [organization] citation number.
     *
     * @param {Contributor[]} contributors
     * @returns {ContributorView[]}
     */
    private buildContributors(contributors: Contributor[]): ContributorView[] {
        const projectContributors =
            this.filterContributorsWithProjectContributors(contributors);
        const contributorOrganizations = new Set(
            this.getCollaboratingOrganizations(projectContributors)
        );

        return projectContributors.map((projectContributor) => {
            return {
                citation:
                    [...contributorOrganizations].indexOf(
                        projectContributor.institution
                    ) + 1,
                name: this.formatContributor(projectContributor.contactName),
                role: projectContributor.projectRole,
            };
        });
    }

    /**
     * Returns formatted set of "data curator" contributors.
     *
     * @param {Contributor[]} contributors
     * @returns {ContributorView[]}
     */
    private buildDataCurators(contributors: Contributor[]): string[] {
        return contributors
            .filter((contributor) =>
                this.isContributorDataCurator(contributor.projectRole)
            )
            .map((contributor) => contributor.contactName)
            .map((name) => this.formatContributor(name));
    }

    /**
     * Returns project data summary related information, included formatted display text.
     *
     * @param {Project} project
     * @returns {KeyValuePair[]}
     */
    private buildDataSummaries(project: Project): KeyValuePair[] {
        const filteredDataSummary = this.filterDataSummary(project);

        return filteredDataSummary.map((key) => {
            const columnName = this.getColumnName(key);

            return {
                key: columnName,
                value: this.stringifyValues(key, project[key]),
            };
        });
    }

    /**
     * Returns view model of project file counts.
     *
     * @param {Project} project
     * @returns {KeyValuePair[]}
     */
    private buildFileTypeCounts(project: Project): KeyValuePair[] {
        const localeStringPipe = new LocaleStringPipe();

        // Calculate the total count of files
        const totalCount = Array.from(project.fileTypeCounts.values()).reduce(
            (accum, count) => {
                return accum + count;
            }
        );

        // Create file type view objects
        const fileTypeViews = [];
        Array.from(project.fileTypeCounts.keys()).forEach((fileType) => {
            fileTypeViews.push({
                key: fileType,
                value: localeStringPipe.transform(
                    project.fileTypeCounts.get(fileType)
                ),
            });
        });

        // Sort file types by alpha, descending
        fileTypeViews.sort((ftv0, ftv1) => {
            if (ftv0.key > ftv1.key) {
                return 1;
            }
            if (ftv0.key < ftv1.key) {
                return -1;
            }
            return 0;
        });

        // Add the total file count to the set
        fileTypeViews.push({
            key: "Total",
            value: localeStringPipe.transform(totalCount),
        });

        return fileTypeViews;
    }

    /**
     * Returns the list of contributors for the project.
     * Will exclude any contributor with role "data curator".
     *
     * @param {Contributor[]} contributors
     * @returns {Contributor[]}
     */
    private filterContributorsWithProjectContributors(
        contributors: Contributor[]
    ): Contributor[] {
        return contributors.filter(
            (contributor) =>
                !this.isContributorDataCurator(contributor.projectRole)
        );
    }

    /**
     * Returns filtered data summary list excluding any summary items with specialist display conditions.
     *
     * Workflow will not display if "Unspecified".
     * Analysis Protocol "modelOrgan" will not display if the sampleEntityType is "specimens".
     *
     * @param {Project} project
     * @returns {string[]}
     */
    private filterDataSummary(project: Project): string[] {
        return Object.keys(this.ACCEPT_LIST_DATA_SUMMARY_TO_KEY).filter(
            (key) => {
                if (key === "modelOrgan") {
                    return !this.isSampleEntityTypeSpecimens(
                        project.sampleEntityType
                    );
                }

                if (key === "workflow") {
                    return this.isWorkflowNotUnspecified(project.workflow);
                }

                return true;
            }
        );
    }

    /**
     * Returns formatted name from "firstName,middleName,lastName" to "firstName middleName lastName".
     *
     * @param {string} commaDelimitedName
     * @returns {string}
     */
    private formatContributor(commaDelimitedName: string): string {
        return commaDelimitedName.split(/[ ,]+/).join(" ");
    }

    /**
     * Return column name for specified summary name.
     * Handles any variation between project data and column names for display of project label and tooltips.
     *
     * e.g. project.fileType refers to column name "fileFormat".
     *
     * @param {string} key
     * @returns {string}
     */
    private getColumnName(key: string): string {
        let columnName = key;

        const alternateKey = this.ACCEPT_LIST_DATA_SUMMARY_TO_KEY[columnName];

        if (alternateKey) {
            columnName = alternateKey;
        }

        return columnName;
    }

    /**
     * Returns the list of collaborating organizations of the project.
     *
     * @param {Contributor[]} contributors
     * @returns {string[]}
     */
    private getCollaboratingOrganizations(
        contributors: Contributor[]
    ): string[] {
        return contributors.map((contributor) => contributor.institution);
    }

    /**
     * Returns true if the contributor's projectRole is "data curator".
     *
     * @param {string} projectRole
     * @returns {boolean}
     */
    private isContributorDataCurator(projectRole: string): boolean {
        return projectRole && projectRole.toLowerCase() === "data curator";
    }

    /**
     * Returns true if sample entity type is "specimens".
     *
     * @param {string} sampleEntityType
     * @returns {boolean}
     */
    private isSampleEntityTypeSpecimens(sampleEntityType: string): boolean {
        return sampleEntityType === "specimens";
    }

    /**
     * Returns true if workflow is any value other than "Unspecified".
     *
     * @param {string} workflow
     * @returns {boolean}
     */
    private isWorkflowNotUnspecified(workflow: string): boolean {
        return workflow !== "Unspecified";
    }

    /**
     * Return string-concat'ed version of the specified array or number as a string value.
     *
     * @param {string} key
     * @param value
     * @returns {string}
     */
    private stringifyValues(key: string, value: any): string {
        let valueIfNull = "Unspecified";
        const displayText = this.DATA_SUMMARY_NULL_VALUE_TO_DISPLAY_VALUE[key];

        if (displayText) {
            valueIfNull = displayText;
        }

        if (!value) {
            return valueIfNull;
        }

        if (value.length === 0) {
            return valueIfNull;
        }

        // Return number as string
        if (typeof value === "number") {
            // Donor count, estimated cells
            if (key === "totalCells" || key === "donorCount") {
                return new CountSizePipe().transform(value);
            }

            return value.toString();
        }

        // Dedupe array values (e.g. file type summaries) and return as string
        if (Array.isArray(value)) {
            return [...new Set(value)].join(", ");
        }

        // Return string as is
        return value;
    }
}

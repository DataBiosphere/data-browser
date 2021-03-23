/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Directive handling drag, drop and click-related functionality of file upload. 
 */

// Core dependencies
import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    HostListener,
    HostBinding,
    OnDestroy,
    Output,
    QueryList,
    ViewChild
} from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { DropError } from "./drop-error.model";
import { DirectoryButtonComponent } from "./directory-button/directory-button.component";
import { DropzoneService } from "./dropzone.service";

@Component({
    selector: "dropzone",
    templateUrl: "dropzone.component.html",
    styleUrls: ["dropzone.component.scss"]
})
export class DropzoneComponent implements AfterContentInit, AfterViewInit, OnDestroy {

    // Locals
    private directoryOpen = false;
    private dragTargets = [];
    private ngDestroy$ = new Subject();

    // Bindings
    @HostBinding("class.dragging") dragging: boolean;
    
    // Content child/ren
    @ContentChildren(
        DirectoryButtonComponent,
        {descendants: true, read: ElementRef}) directoryButtonElementRefs: QueryList<ElementRef>;
    
    // View child/ren
    @ViewChild("file") fileInputElementRef: ElementRef;

    // Inputs/outputs
    @Input() onClick: Function;
    @Input() maxSize: number;
    @Input() multiple: boolean;
    @Output() dropAccepted = new EventEmitter<any>();
    @Output() dropRejected = new EventEmitter<DropError>();

    /**
     * @param {DropzoneService} dropzoneService
     * @param {ElementRef} elementRef - allow access via ViewChild/ren
     * @param {Window} window
     */
    constructor(private dropzoneService: DropzoneService, private elementRef: ElementRef, @Inject("Window") private window: Window) {}

    /**
     * @param {DragEvent} evt
     */
    @HostListener("dragenter", ["$event"]) onDragEnter(evt) {

        evt.preventDefault();
        evt.stopPropagation();

        this.dragTargets.push(evt.target);
        this.dragging = true;
    }

    /**
     * @param {DragEvent} evt
     */
    @HostListener("dragleave", ["$event"]) public onDragLeave(evt) {

        evt.preventDefault();
        evt.stopPropagation();

        const targetIndex = this.dragTargets.indexOf(evt.target);
        if ( targetIndex >= 0 ) {
            this.dragTargets.splice(targetIndex, 1);
        }
        if ( this.dragTargets.length === 0 ) {
            this.dragging = false;
        }
    }

    /**
     * @param {DragEvent} evt
     */
    @HostListener("dragover", ["$event"]) onDragOver(evt) {

        evt.preventDefault();
        evt.stopPropagation();
    }

    /**
     * @param {DragEvent | Event} evt - handles either drop of file or change in value of file input.
     */
    @HostListener("drop", ["$event"]) onDrop(evt) {

        evt.preventDefault();
        evt.stopPropagation();

        this.dragTargets = [];
        this.dragging = false;

        if ( !this.dropzoneService.isEventWithFiles(evt) ) {
            return;
        }

        let files;
        if ( this.dropzoneService.isDragEvent(evt) ) {
            files = this.dropzoneService.getDraggedFiles(evt);
        }
        else {
            files = this.dropzoneService.getInputFiles(evt);
        }
        
        this.onFilesSelected(files);
    }

    /**
     * The set of directory buttons has been initialized or updated: hook up click event with file input click. 
     */
    private initDirectoryButtons(directoryButtonElementRefs: ElementRef[]) {

        if ( !directoryButtonElementRefs || !directoryButtonElementRefs.length ) {
            return;
        }
        
        directoryButtonElementRefs.forEach((directoryButtonElementRef) => {
            this.initDirectoryButton(directoryButtonElementRef);
        });
    }

    /**
     * Handle click on directory button - trigger click on hidden file input.
     * 
     * @param {ElementRef} directoryButtonElementRef
     */
    private initDirectoryButton(directoryButtonElementRef: ElementRef) {

        if ( !directoryButtonElementRef ) {
            return;
        }
        fromEvent(directoryButtonElementRef.nativeElement, "click")
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(() => this.openDirectory());
    }

    /**
     * Handle select or drop of files.
     * 
     * @param {File[]} files
     */
    private onFilesSelected(files: File[]) {

        // Check file count - reject if more than one file was dropped but multiple files are not allowed
        // TODO extension - update this to emit an array of errors for each file
        if ( !this.dropzoneService.isFileCountValid(files.length, this.multiple) ) {
            this.dropRejected.emit(this.dropzoneService.TOO_MANY_FILES_REJECTION);
            return;
        }

        // Check max file size
        // TODO extension - update this to emit an array of errors for each file
        if ( !this.dropzoneService.isFileSizeValid(files, this.maxSize) ) {
            this.dropRejected.emit(this.dropzoneService.FILE_TOO_LARGE(this.maxSize));
            return;
        }

        if ( files.length > 0 ) {
            this.dropAccepted.emit(files);
        }
    }

    /**
     * Open OS file browser.
     */
    private openDirectory() {

        this.directoryOpen = true;
        this.fileInputElementRef.nativeElement.value = null;
        this.fileInputElementRef.nativeElement.click();
    }

    /**
     * Hook up directory button click with click on file input. Must wait for content to be initialized before we can
     * get a handle on the projected directory button.
     */
    ngAfterContentInit() {

        // Set up initial directory button click handler
        this.initDirectoryButtons(this.directoryButtonElementRefs.toArray());

        // It's possible the directory button can be removed and added to the DOM if a file is selected and the deleted.
        // Listen for changes in directory button and re-attach click handlers if necessary.
        this.directoryButtonElementRefs.changes.subscribe((updatedRefs) => {
            this.initDirectoryButtons(updatedRefs.toArray());
        });
    }

    /**
     * Add listener on file input change to handle files selected via OS file directory.
     */
    ngAfterViewInit() {

        // Set up change listener on file input
        fromEvent(this.fileInputElementRef.nativeElement, "change")
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((evt: Event) => this.onDrop(evt));
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }
}

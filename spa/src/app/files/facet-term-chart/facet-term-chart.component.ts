// Core dependencies
import { Component, ElementRef, Input, SimpleChange, ViewChild } from "@angular/core";
import * as d3 from "d3";

// App dependencies
import { FacetTermChartScales } from "./facet-term-chart-scales";
import { FacetTermChartData } from "./facet-term-chart-data";
import { FacetTermChartDOM } from "./facet-term-chart-dom";

/**
 * Displays horizontal bar chart of term spread of a facet.
 */

@Component({
    selector: "facet-term-chart",
    templateUrl: "facet-term-chart.component.html",
    styleUrls: ["facet-term-chart.component.scss"]
})
export class FacetTermChartComponent {

    // Locals
    private chartDOM: FacetTermChartDOM;

    // Inputs
    @Input() chartData: FacetTermChartData;

    // View children
    @ViewChild("chartContainer") chartContainer: ElementRef;

    /**
     * Privates
     */

    /**
     * Append SVG and root graphics element to DOM - resizing functionality as well as graphics elements/chart data are
     * added later.
     *
     * @param el {HTMLElement}
     * @param chartId {string}
     * @returns {FacetTermChartDOM}
     */
    private buildBaseDOM(el: HTMLElement, chartId: string): FacetTermChartDOM {

        // Add ID to element ref - required for resize
        el.id = chartId;

        // Calculate width of SVG - should consume entire width of chart container, no margins
        let width = el.clientWidth;

        // Calculate height of SVG - should always be 8px, no margins
        let height = 8;

        // Add SVG to DOM
        let svg = d3.select(el)
            .append("svg")
                .attr("width", width) // No margin
                .attr("height", height); // No margin

        let g = svg
            .append("g")
                .attr("transform", "translate(0, 0)"); // No margin - place graphics at origin

        let d3El = d3.select(el);
        let tooltip = d3El.selectAll(".chart-tooltip-container");
        if ( tooltip.empty() ) {
            tooltip = d3El.append("div").attr("class", "chart-tooltip-container");
        }

        return new FacetTermChartDOM(svg, g, tooltip);
    }

    /**
     * Generate x, y and color scales.
     *
     * @param chartDOM {FacetTermChartDOM}
     * @param chartData {FacetTermChartData}
     * @returns {FacetTermChartScales}
     */
    private calculateScales(chartDOM: FacetTermChartDOM, chartData: FacetTermChartData): FacetTermChartScales {

        let width: number = chartDOM.getSVGWidth();
        let height: number = chartDOM.getSVGHeight();

        // Calculate x scale - must calculate this before adding SVG so we can attach resize event listener
        // to SVG, and recalculate rectangle coordinates/widths
        let xScale = d3.scaleLinear()
            .domain([0, chartData.totalCount]) // Domain is total count of terms for facet
            .range([0, width]); // Range is full pixel width of container

        // Calculate y scale
        let yScale = d3.scaleBand()
            .padding(0) // No padding
            .align(0) // Align to origin
            .domain([chartData.data.facetName]) // Group data by facet (we're dealing with just a single facet)
            .range([height, 0]); // Range is height of container, SVG origin is top left so reverse range values to match

        // Calculate color scale
        let colors: string[] = chartData.colors;

        let colorScale = d3.scaleOrdinal()
            .domain(chartData.keys)
            .range(colors.splice(0, chartData.keys.length));

        // Create basic chart config
        return new FacetTermChartScales(xScale, yScale, colorScale);
    }

    /**
     * Populate chart using chart config and formatted data.
     *
     * @param chartData {FacetTermChartData}
     * @param chartDOM {FacetTermChartDOM}
     * @param chartScales {FacetTermChartConfig}
     */
    private populate(chartData: FacetTermChartData, chartDOM: FacetTermChartDOM, chartScales: FacetTermChartScales): void {

        // Stack data - use "count" as the key to generate stack itself.
        let stackedData = d3.stack().keys(chartData.keys)([chartData.data]);

        // Data join!
        let update = chartDOM.g
            .append("g")
                .selectAll("g")
                .data(stackedData);

        // Add new data points with no matching elements
        update.enter()
            .append("g")
                .attr("fill", (d) => { return chartScales.colorScale(d.key) as string; })
                .on("mouseenter", (d) => {

                        let x1 = d[1];
                        let tooltipContent = chartDOM.tooltip
                            .append("div")
                            .attr("class", "mat-tooltip")
                            .text(d.key);

                        // x coordinate - position tooltip in middle of section bar
                        let data: number[] = d[0];
                        let x0:number = chartScales.xScale(data[0]);
                        let sectionWidth: number = chartScales.xScale(data[1]) - x0;

                        // Calculate width of tooltip
                        let tooltipContentEl = tooltipContent.node();
                        let contentWidth: number =
                            tooltipContentEl.offsetWidth + (2 * tooltipContentEl.offsetLeft);

                        // Center tooltip above section bar
                        let xCoord: number =
                            x0 + ((sectionWidth - contentWidth) / 2);

                        // Confirm tooltip is within bounds of viewport. If not, scoot tooltip to left or right.
                        let maxX: number = chartScales.xScale.range()[1];
                        if ( xCoord < 0 ) {
                            xCoord = 0;
                        }
                        else if ( xCoord + contentWidth > maxX ) {
                            let overage = (xCoord + contentWidth) - maxX;
                            xCoord = xCoord - overage;
                        }

                        chartDOM.tooltip.attr("style", `left:${xCoord}px;top:-50px`); // TODO revisit height

                        // Animate tooltip open
                        tooltipContent.classed("open", true);
                })
                .on("mouseleave", (d) => {

                    d3.select(".mat-tooltip").remove();
                })
                .selectAll("rect")
                .data((d) => { return d as any[]; })
                .enter()
            .append("rect")
                .attr("x", d => { return chartScales.xScale(d[0]); }) // X position should be first coordinate
                .attr("y", d => { return chartScales.yScale(d.facetName); }) // Data contains { facetName: "", termName: termCount, termName: termCount }
                .attr("width", d => { return chartScales.xScale(d[1]) - chartScales.xScale(d[0]);
                }) // Width should be second coordinate minus first coordinate, scaled to X scale
                .attr("height", chartScales.yScale.bandwidth()); // Height to take up full range

        // Remove existing elements with no data points
        update.exit().remove();
    }

    /**
     * Add responsive functionality to chart (similar in concept to
     * https://egghead.io/lessons/d3-start-visualizing-data-driven-documents-with-d3-v4).
     *
     * Requires chart DOM to calculate new container width and scales to calculate rectangle widths and coordinates.
     *
     * @param chartDOM {FacetTermChartDOM}
     * @param chartScales {FacetTermChartScales}
     */
    private responsivefy(chartDOM: FacetTermChartDOM, chartScales: FacetTermChartScales): void {

        // Get container - we'll need to update the SVG's width to match container width
        let container = d3.select(chartDOM.svg.node().parentNode);

        // Add viewBox, and call resize so that SVG resizes on initial page load.
        chartDOM.svg.call(resize);

        // To register multiple listeners for same event type, you need to add namespace, i.e., 'click.foo'
        // Necessary if you call invoke this function for multiple SVG
        // API docs: https://github.com/mbostock/d3/wiki/Selections#on
        d3.select(window).on("resize." + container.attr("id"), resize);

        // On resize, calculate container with and resize SVG to fit it
        function resize() {

            // Update SVG element's width
            let targetWidth = parseInt(container.style("width"), 10);
            chartDOM.svg.attr("width", targetWidth);

            // Update x range
            chartScales.xScale.range([0, targetWidth]);

            // Rescale bars
            chartDOM.svg
                .selectAll("rect")
                .attr("x", d => { return chartScales.xScale(d[0]); }) // TODO create private method for this (currently duped)
                .attr("width", d => { return chartScales.xScale(d[1]) - chartScales.xScale(d[0]); }); // TODO create private method for this (currently duped)
        }
    }

    /**
     * Lifecycle hooks
     */

    /**
     * Draw/re-draw chart on set/change of input.
     *
     * @param changes {SimpleChange}
     */
    ngOnChanges(changes: SimpleChange): void {

        // If this is the first time chart data is set, create SVG and root graphics element
        if ( changes["chartData"].isFirstChange() ) {
            let chartId = this.chartData.data.facetName;
            this.chartDOM = this.buildBaseDOM(this.chartContainer.nativeElement, chartId);
        }

        // Determine x, y and color scales from chart container widths and updated chart data
        let chartScales: FacetTermChartScales =
            this.calculateScales(this.chartDOM, this.chartData);

        // Hook up responsive functionality, requires chart DOM to calculate new container width, and scales to
        // calculate new rectangle widths and coordinates.
        this.responsivefy(this.chartDOM, chartScales);

        // Populate chart with data
        this.populate(this.chartData, this.chartDOM, chartScales);
    }
}

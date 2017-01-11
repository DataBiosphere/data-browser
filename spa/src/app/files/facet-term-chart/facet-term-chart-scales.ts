/**
 * X and Y scale configuration required for, and backing single, horizontal, stacked bar chart, displaying term
 * breakdown of a given facet.
 */
export class FacetTermChartScales {

    // X scale
    public xScale;

    // Y scale
    public yScale;

    // Color scale
    public colorScale;

    /**
     * Chart config - x and y scales
     *
     * @param xScale
     * @param yScale
     * @param colorScale
     */
    constructor(xScale, yScale, colorScale) {

        this.xScale = xScale;
        this.yScale = yScale;
        this.colorScale = colorScale;
    }
}
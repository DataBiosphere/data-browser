export class Term {

    public readonly  name: string;
    public readonly  count: number;
    public readonly  selected: boolean;
    public  color: string;

    constructor(name: string, count: number, selected: boolean, color: string) {
        this.name = name;
        this.count = count;
        this.selected = selected;
        this.color = color;
    }

    public setSelected(selected: boolean): Term {
        return new Term(this.name, this.count, selected, this.color);
    }

}



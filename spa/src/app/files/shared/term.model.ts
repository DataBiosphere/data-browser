export class Term {

    public readonly  name: string;
    public readonly  count: number;
    public readonly  selected: boolean;

    constructor(name: string, count: number, selected: boolean){
        this.name = name;
        this.count = count;
        this.selected = selected;
    }

    public setSelected(selected: boolean):Term{
        return new Term(this.name, this.count, selected);
    }

}



export class Game{

    constructor(label: string, description: string, picture:string, active: boolean){
        this.label = label;
        this.description = description;
        this.picture = picture;
        this.active = active;
    }

    label: string;
    description: string;
    picture: string;
    active: boolean;
}
export class Publication{

    constructor(title: string,message: string, game: string){
        this.title = title;
        this.message = message;
        this.game = game;
    }

    id: number;
    title: string;
    message: string;
    author: string;
    game: string;
    date: string;
}
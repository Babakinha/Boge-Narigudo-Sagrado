import { Collection } from "discord.js";
import * as fs from "fs";
import Path from 'path'
import { commandInterface } from "./interfaces";

export default class commandHandler{
    constructor() {

    };

    Commands = new Collection<commandInterface['names'], commandInterface['run']>();

    public getCommand(name: string): commandInterface['run'] {
        const commandFile = this.Commands.find((r, n) => {if(!n) return false;return n.includes(name)});
        if(commandFile) return commandFile;
        else throw new Error('CommandNotFound');
    };

    public loadCommands(path: fs.PathLike) {
        const files = fs.readdirSync(path);

        //loop through files
        for (const file of files) {
            //recursive way to read through all folders
            const stat = fs.lstatSync(Path.join(String(path), file))
            if(stat.isDirectory()) {
                this.loadCommands(Path.join(String(path), file));
                continue;
            }else {
                if(file.endsWith('.js') || file.endsWith('.ts')){
                    let command = require(Path.join(String(path), file)) as commandInterface
                    this.Commands.set(command.names, command.run);
                }else continue;
            }


        }
    };
}
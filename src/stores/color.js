import { defineStore } from 'pinia';

export default defineStore("color", {

    state(){ //data
        return {
            darkmode:true,

            maincolor:"#121212",
            blockcolor:"#272727",
            subcolor:"#494949",
            textcolor:"#eeeeee",
            linkcolor:"#3eaf7c",

            darkmodeColor:{
                maincolor:"#121212",
                blockcolor:"#272727",
                subcolor:"#494949",
                textcolor:"#eeeeee",
                linkcolor:"#3eaf7c"
            },

            lightmodeColor:{
                maincolor:"#edede9",
                blockcolor:"#e3d5ca",
                subcolor:"#d6ccc2",
                textcolor:"#121212",
                linkcolor:"#234da3"
            }
            

        }
    },

    getters:{ //computed

    },

    actions:{ //methods
        changemode(){
            if(this.darkmode){
                this.maincolor = this.lightmodeColor.maincolor
                this.blockcolor = this.lightmodeColor.blockcolor
                this.subcolor = this.lightmodeColor.subcolor
                this.textcolor = this.lightmodeColor.textcolor
                this.linkcolor = this.lightmodeColor.linkcolor
                this.darkmode = false;
            }else{
                this.maincolor = this.darkmodeColor.maincolor
                this.blockcolor = this.darkmodeColor.blockcolor
                this.subcolor = this.darkmodeColor.subcolor
                this.textcolor = this.darkmodeColor.textcolor
                this.linkcolor = this.darkmodeColor.linkcolor
                this.darkmode = true;
            }
        }
    }
})
function showtime() {
    /**
     * To initialize the Editor, create a new instance with configuration object
     * @see docs/installation.md for mode details
     */
    var editor = new EditorJS({
        /**
         * Wrapper of Editor
         */
        holder: 'editorjs',

        /**
         * Tools list
         */
        tools: {
            /**
             * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
             */
            header: {
                class: Header,
                inlineToolbar: ['link'],
                config: {
                    placeholder: 'Header'
                },
                shortcut: 'CMD+SHIFT+H'
            },

            /**
             * Or pass class directly without any configuration
             */
            // image: SimpleImage,

            list: {
                class: List,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+L'
            },

            checklist: {
                class: Checklist,
                inlineToolbar: true,
            },

            quote: {
                class: Quote,
                inlineToolbar: true,
                config: {
                    quotePlaceholder: 'Enter a quote',
                    captionPlaceholder: 'Quote\'s author',
                },
                shortcut: 'CMD+SHIFT+O'
            },

            warning: Warning,

            marker: {
                class: Marker,
                shortcut: 'CMD+SHIFT+M'
            },

            code: {
                class: CodeTool,
                shortcut: 'CMD+SHIFT+C'
            },

            delimiter: Delimiter,

            inlineCode: {
                class: InlineCode,
                shortcut: 'CMD+SHIFT+C'
            },

            linkTool: LinkTool,

            embed: Embed,

            table: {
                class: Table,
                inlineToolbar: true,
                shortcut: 'CMD+ALT+T'
            },

        },

        /**
         * This Tool will be used as default
         */
        // initialBlock: 'paragraph',

        /**
         * Initial Editor data
         */
        data: {
            blocks: [
                {
                    type: "header",
                    data: {
                        text: "Brief",
                        level: 1
                    }
                },
                {
                    type: "header",
                    data: {
                        text: "4 x Landing pages & Div Google Adds one-liners. ",
                        level: 3
                    }
                },
                {
                    type: 'paragraph',
                    data: {
                        text: `
                  Vi skal bruge tekst til 4 x landing pages. Hver landing page skal indeholde
                  minimum 450 ord og gerne op til 900 ord. De 4 forskellige pages er og skal
                  handle om: <strong>Animations Video, Explainer video, infografik og Illustration.</strong>
                  <br>
                  <br>
                  Det er vigtigt at de 4 sidder er unikke så der ikke bliver genbrugt noget
                  tekst på tværs af siderne.
                  <br>
                  <br>
                  Bryd gerne teksten op med overskrifter og underoversk rifter, så den er
                  letlæselig.
                  <br>
                  <br>
                  Prøv at undgå at skrive i for lange sætninger. Teksten skal være nem at scanne
                  for øjet.
                  <br>
                  <br>
                  Brug gerne søgeordet (sidens emne) der hvor det er naturligt.
                  <br>
                  <br>
                  Byg teksten op baseret på de naturlige spørgsmål du kan forestille dig en kunde
                  har, når de lander på sådan en landing page.
                  Det kunne være:
                  <br>
                  <br>`
                    }
                },
                {
                    type: 'list',
                    data: {
                        items: [
                            'Hvad er det (emnet - eks. Animationsvideo)',
                            'Hvad får man ud af at? For eksempel at levendegøre sit budskab.',
                            'Hvor kan man anvende det?',
                            'Hvilke typer findes der? (eks. 2d, 3d, explainer video, motion graphics, etc)',
                            'Hvilke eksempler har Nothing indenfor emnet.',
                            'Etc.',
                        ],
                        style: 'unordered'
                    }
                },

            ]
        },
        onReady: function () {
            var fix = document.querySelector(".codex-editor__redactor");
            fix.style.paddingBottom = "10px"
            //saveButton.click();
        },
        onChange: function () {
            console.log('something changed');
        }
    });

    var brief_logo = document.querySelector(".brief_logo");




    brief_logo.ondragover = function (e) {
        e.preventDefault()
        brief_logo.style.backgroundColor = '#333'
    }
    brief_logo.ondrop = function (e) {
        e.preventDefault(); draw(e.dataTransfer.files[0]);

    }

    function draw(file) {

        var img = new Image();
        // URL @ Mozilla, webkitURL @ Chrome
        img.src = (window.webkitURL ? webkitURL : URL).createObjectURL(file);

        var canvas = document.getElementById("logo_canvas");
        var ctx = canvas.getContext("2d");

        // call ctx.drawImage when the image got loaded
        img.onload = function () {
            // ctx.drawImage(img, 0, 0);
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height); // stretch img to canvas size
        }

    }



    var list = [];
    var totalSize = 0;
    var totalProgress = 0;
    var reader = new FileReader();
    var canvas2 = new fabric.Canvas('image_canvas');
    var can2imgX = 0;
    var brief_image_wrap = document.querySelector(".brief_image_wrap");



    brief_image_wrap.ondragover = function (e) {
        e.preventDefault()
       // brief_image_wrap.style.backgroundColor = '#333'
    }
    brief_image_wrap.ondrop = function (e) {
        e.preventDefault();
        //     reader.readAsDataURL(e.dataTransfer.files[0]);
        var files = e.dataTransfer.files;
        for (var i = 0; i < files.length; i++) {
            list.push(files[i]);
        }
        handlefiles(list)
    }


    function handlefiles(list) {

        reader.readAsDataURL(list[0]);
        list.shift();

    }


    reader.onload = function (f) {
        var data = f.target.result;
        fabric.Image.fromURL(data, function (img) {
            var oImg = img.set({ left: can2imgX, top: 0 })
            oImg.scaleToHeight(210);
            oImg.scaleToWidth(210);
            canvas2.add(oImg).renderAll();
            var a = canvas2.setActiveObject(oImg);
            //var dataURL = canvas2.toDataURL({format: 'png', quality: 0.8});
            if(can2imgX===426){
                can2imgX=0
            }
            can2imgX += 213

            if (list.length) {

                handlefiles(list)
            } else {
                list = []
            }

        });

    }



    window.addEventListener("keydown", function (event) {
        onKeyDownHandler(event);
    }, false);

    function onKeyDownHandler(e) {
        e.preventDefault();
        var focus_id = e.target.id;
        console.log(focus_id)
        switch (e.keyCode) {
            case 46: // Delete
            case 8: // Backspace
                var doomedObj = canvas2.getActiveObject();
                if (doomedObj.type === 'activeSelection') {
                    // active selection needs a reference to the canvas.
                    doomedObj.canvas2 = canvas;
                    doomedObj.forEachObject(function (obj) {
                        canvas2.remove(obj);
                    });
                }//endif multiple objects
                else {
                    //If single object, then delete it
                    var activeObject = canvas2.getActiveObject();
                    //How to delete multiple objects?
                    //if(activeObject !== null && activeObject.type === 'rectangle') {
                    if (activeObject !== null) {
                        canvas2.remove(activeObject);
                    }
                }//end else there's a single object
                break;
        }
    }
}








if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showtime);
} else {
    showtime();

}
            //
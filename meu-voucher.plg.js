    (function() {
        this.MvRegister = function() {
            this.closeButton = null;
            this.overlay = null;
            this.mainContainer
            this.modal = null;
            this.clientId = null;
            this.offerId = null;
            this.buttonId = null;
            this.globalStyle = null;
            this.progress = null;
            this.stepOne = null;
            this.stepTwo = null;
            this.stepThree = null;
            this.activeForm = null;
            this.head = [];
            this.progBar = null;
            this.modalId = null;
            this.stepRef = null;
            this.useDatasets = false;
            this.stepContainer = null;
            this.apiUrl = "https://api.meuvoucher.com";
            //this.apiUrl = "http://localhost:8989";
            this.voucherUrl = 'http://ofertas.meuvoucher.com/#/cupom';
            this.form = 1;
            this.loader = null;
            this.emailRegister = null;
            this.userRegisterId = null;
            this.alert = null;
            var defaults = {
                className: 'fade-and-drop',
                closeButton: true,
                buttonId: null,
                overlay: true,
                offerId: null,
                inputFontSize: '1.4rem'
            }
            this.transitionEnd = transitionSelect();
            this.header = headerContents();
            this.stepProgress = _stepsPrg.call(this);
            if (arguments[0] && typeof arguments[0] === "object") {
                this.options = extendDefaults(defaults, arguments[0]);
            }
        }
        MvRegister.prototype.init = function(){
            var error;
            var _me = this;
            var dataParams = getParams('meu-voucher.plg.js');
            _me.clientId = dataParams.clientId;
            if(_me.options.useDatasets){
                _me.options.offerId = null;
                document.addEventListener("DOMContentLoaded", function(event) {
                    var button = document.querySelectorAll('[data-mv-modal="true"]');
                    for(var x=0;x < button.length; x++){
                        button[x].addEventListener("click", function(){
                            if(!this.dataset.mvOfferId){
                                message = {error: "Nenhuma oferta foi especificada"}
                                console.log(message)
                                return
                            }
                            var offers = JSON.parse(this.dataset.mvOfferId);
                            _me.options.offerId = offers;
                            open.call(_me)
                        })
                    }
                })
            }else{
                if(!_me.options.offerId){
                    error = {error: "Código da oferta não informado. Consulte a documentação do plugin"}
                    console.log(error);
                    return
                }
                if(!dataParams.clientId){
                    error = {error: "Código do cliente não informado. Consulte a documentação do plugin"}
                    console.log(error);
                    return
                }
                open.call(_me)
            }
            
        }
        function open(){
            buildOut.call(this);
            initializeEvents.call(this);
            window.getComputedStyle(this.mainContainer).height;
            this.modal.className = this.modal.className +
            (this.modal.offsetHeight > window.innerHeight ?
                " mv-open mv-anchored" : " mv-open");
            this.overlay.className = this.overlay.className + " mv-open";
        }
        MvRegister.prototype.close = function() {
            var _ = this;
            this.modal.className = this.modal.className.replace(" mv-open", "");
            this.overlay.className = this.overlay.className.replace(" mv-open", "");
            this.modal.addEventListener(this.transitionEnd, function() {
                _.mainContainer.parentNode.removeChild(_.mainContainer);
            });
            this.overlay.addEventListener(this.transitionEnd, function() {
                if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
                _.head[0].parentNode.removeChild(_.head[0]);
                _.head[1].parentNode.removeChild(_.head[1]);
            });
            if(this.form > 1){
                this.form = 1;
                this.emailRegister = null;
                this.stepRef.className = "mv-form-wizard-step";
                this.progBar.style.width = "12.5%"
                var acid = document.getElementById("mv-step-9301763976aP1");
                acid.className = "mv-form-wizard-step";
            }
            this.globalStyle = null
        }
        function getParams(script_name) {
            var scripts = document.getElementsByTagName("script");
            for(var i=0; i<scripts.length; i++) {
                if(scripts[i].src.indexOf("/" + script_name) > -1) {
                var pa = scripts[i].src.split("?").pop().split("&");
                var p = {};
                var kv = pa[0].split("=");
                p[kv[0]] = kv[1];
                return p;
                }
            }
            return {};
        }
        function buildOut() {
            var content, contentHolder, docFrag, mainContainer;
            var scrollTop = window.scrollY;
            if(!this.globalStyle){
                this.globalStyle = document.getElementsByTagName('head').item(0);
                this.head[0] = document.createElement('link');
                this.head[1] = document.createElement("style");
                this.head[0].href = "https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,500,700,900";
                this.head[0].rel = "stylesheet";
                this.head[0].id = "mv-8379xmhbo9N__"
                this.head[1].type = "text/css";
                this.head[1].appendChild(document.createTextNode(".mv-modal.mv-open{opacity: 1 !important;}" +
                   ".mv-overlay.mv-open{opacity: 1;}" +
                    ".mv-modal{" +
                        "font-family: 'Roboto', sans-serif;" +
                        "opacity: 0;" +
                        "left: 50%;" +
                        "font-size: 100%;" +
                        "min-height: 300px;" +
                        "box-sizing: border-box;" +
                        "border-radius: 4px;" +
                        "-webkit-transition: 1ms opacity ease;" +
                        "-moz-transition: 1ms opacity ease;" +
                        "-ms-transition: 1ms opacity ease;" +
                        "-o-transition: 1ms opacity ease;" +
                        "transition: 1ms opacity ease;" +
                        "-webkit-transform: translate(-50%, -50%);" +
                        "-moz-transform: translate(-50%, -50%);" +
                        "-ms-transform: translate(-50%, -50%);" +
                        "-o-transform: translate(-50%, -50%);" +
                        "transform: translate(-50%, -50%);" +
                        "-webkit-box-shadow: 0px 0px 18px -5px rgba(0,0,0,0.75);" +
                        "-moz-box-shadow: 0px 0px 18px -5px rgba(0,0,0,0.75);" +
                        "box-shadow: 0px 0px 18px -5px rgba(0,0,0,0.75);" +
                    "}" +
                    ".mv-modal.mv-open.mv-anchored{" +
                    "-webkit-transform: translate(-50%, 0);" +
                        "-moz-transform: translate(-50%, 0);" +
                            "-ms-transform: translate(-50%, 0);" +
                            "-o-transform: translate(-50%, 0);" +
                                "transform: translate(-50%, 0);" +
                    "}" +
                    ".mv-overlay{" +
                        "opacity: 0;"+
                        "-webkit-transition: 1ms opacity ease;" +
                        "-moz-transition: 1ms opacity ease;" +
                            "-ms-transition: 1ms opacity ease;" +
                            "-o-transition: 1ms opacity ease;" +
                                "transition: 1ms opacity ease;" +
                    "}" +
                    ".mv-overlay.fade-and-drop{" +
                    " display: block;" +
                        "opacity: 0;" +
                    "}" +
                    ".mv-modal.fade-and-drop" +
                    "{" +
                        "top: -300%;" +
                        "opacity: 1;" +
                        "display: block;" +
                    "}" +
                    ".mv-modal.fade-and-drop.mv-open" +
                    "{"+
                        "top: 50%;" +
                        "-webkit-transition: 400ms top 400ms easeInOut;" +
                        "-moz-transition: 400ms top 400ms easeInOut;" +
                            "-ms-transition: 400ms top 400ms easeInOut;" +
                            "-o-transition: 400ms top 400ms easeInOut;" +
                                "transition: 400ms top 400ms easeInOut;" +
                    "}" +
                    ".mv-modal.fade-and-drop.mv-open.mv-anchored{" +
                        "-webkit-transition: 500ms top 500ms ease;" +
                        "-moz-transition: 500ms top 500ms ease;" +
                            "-ms-transition: 500ms top 500ms ease;" +
                            "-o-transition: 500ms top 500ms ease;" +
                                "transition: 500ms top 500ms ease;" +
                    "}" +
                    ".mv-overlay.fade-and-drop.mv-open{" +
                        "top: 0;" +
                        "-webkit-transition: 500ms opacity ease;" +
                        "-moz-transition: 500ms opacity ease;" +
                            "-ms-transition: 500ms opacity ease;" +
                            "-o-transition: 500ms opacity ease;" +
                                "transition: 500ms opacity ease;" +
                        "opacity: 1;" +
                    "}" +
                    ".mv-modal.fade-and-drop" +
                    "{" +
                        "-webkit-transition: 500ms top ease;" +
                        "-moz-transition: 500ms top ease;"+
                            "-ms-transition: 500ms top ease;"+
                            "-o-transition: 500ms top ease;"+
                                "transition: 500ms top ease;"+
                    "}"+
                    ".mv-overlay.fade-and-drop"+
                    "{"+
                        "-webkit-transition: 500ms opacity 500ms ease;"+
                    " -moz-transition: 500ms opacity 500ms ease;"+
                            "-ms-transition: 500ms opacity 500ms ease;"+
                            "-o-transition: 500ms opacity 500ms ease;"+
                                "transition: 500ms opacity 500ms ease;"+
                    "}" +
                    ".mv-form-wizard-title{" +
                        "font-family: 'Roboto', sans-serif;" +
                        "font-size: 23px;" +
                        "font-weight: 300;"+
                        "color: #e53935;"+
                        "line-height: 30px;"+
                        "margin-top: 0;"+
                        "margin-bottom: 5px;"+
                        "text-transform: uppercase;"+
                        "text-align: center;"+
                    "}"+
                    ".mv-form-wizard-subtitle{"+
                        "font-family: 'Roboto', sans-serif;" +
                        "font-size: 16px;"+
                        "font-weight: 300;"+
                        "color: #888;"+
                        "line-height: 30px;"+
                        "text-align: center;"+
                        "margin: 0 0 10px;"+
                    "}"+
                    ".mv-form-wizard-steps {"+
                        "font-family: 'Roboto', sans-serif;" +
                        "margin: auto;"+
                        "margin-top: auto;"+
                        "overflow: hidden;"+
                        "position: relative;"+
                        "margin-top: 20px;"+
                        "font-size: 16px;"+
                        "font-weight: 300;"+
                        "color: #888;"+
                        "line-height: 30px;"+
                        "text-align: center;"+
                    "}"+
                    ".mv-form-wizard-progress {" +
                        "position: absolute;" +
                        "top: 24px;"+
                        "left: 0;"+
                        "width: 100%;"+
                        "height: 1px;"+
                        "background: #ddd;"+
                    "}"+
                    ".mv-form-wizard-progress-line {"+
                        "position: absolute;"+
                        "top: 0;"+
                        "left: 0;"+
                        "height: 1px;"+
                        "background: #e53935;"+
                        "transition: all 0.4s ease;"+
                        "-ms-transition: all 0.4s ease;"+
                        "-o-transition: all 0.4s ease;"+
                        "-moz-transition: all 0.4s ease;"+
                    "}"+
                    ".mv-form-wizard-step {"+
                        "position: relative;"+
                        "float: left;"+
                        "width: 33.33333%;"+
                        "padding: 0;"+
                        "-moz-transition: 500ms all ease;"+
                        "-ms-transition: 500ms all ease;"+
                        -"o-transition: 500ms all ease;"+
                        "transition: 500ms all ease;"+
                    "}"+
                    ".mv-form-wizard-step-icon {"+
                        "font-family: 'Roboto', sans-serif;" +
                        "width: 48px;"+
                        "height: 48px;"+
                        "margin-top: 0;"+
                        "background: #ddd;"+
                        "font-size: 22px;"+
                        "color: #fff;"+
                        "line-height: 48px;"+
                        "border-radius: 50%;"+
                        "display: inline-block;"+
                        "transition: all 0.5s ease !important;"+
                        "-ms-transition: all 0.5s ease !important;"+
                        "-o-transition: all 0.5s ease !important;"+
                        "-moz-transition: all 0.5s ease !important;"+
                    "}"+
                    ".mv-form-wizard-step.active .mv-form-wizard-step-icon{"+
                        "background: #e53935;"+
                    "}"+
                    ".mv-form-wizard-step p{"+
                        "margin: 5px 0;"+
                    " color: #ccc;"+
                    "}"+
                    ".mv-form-wizard-step.active p{"+
                        "color: #e53935;"+
                    "}"+
                    ".mv-form-progress-info h4{"+
                        "float: left;"+
                        "font-size: 16px;"+
                        "font-weight: 400;"+
                        "color: #888;"+
                        "line-height: 26px;"+
                        "width: 100%;"+
                        "border-bottom: 1px dashed rgba(0,0,0,0.1);"+
                    "}"+
                    ".mv-form-progress-info h4 span {"+
                        "font-family: 'Roboto', sans-serif;" +
                        "float: right;"+
                        "font-size: 14px;"+
                        "font-weight: 700;"+
                        "color: #888;"+
                        "line-height: 26px;"+
                    "}"+
                    ".mv-form-control{"+
                        "margin-bottom: 5px;"+
                        "font-size: 100%;" +
                    "}"+
                    ".mv-form-control label{"+
                        "font-family: 'Roboto', sans-serif;" +
                        "font-weight: 300;"+
                        "display: block;"+
                    " max-width: 100%;"+
                        "margin-bottom: 5px;"+
                        "color: #888;"+
                        "line-height: 30px;"+
                    "}"+
                    ".mv-form-control label span {"+
                        "color: #e53935;"+
                    "}"+
                    ".mv-form-control input{"+
                        "font-family: 'Roboto', sans-serif !important;" +
                        "height: 40px;"+
                        "margin: 0;"+
                        "padding: 0 20px;"+
                        "background: #fff none repeat scroll 0 0;"+
                        "border: 1px solid rgba(0,0,0,.15);"+
                        "border-radius: .25rem;"+
                        "font-family: sans-serif;"+
                        "font-size: "+this.options.inputFontSize+";"+
                        "font-weight: 500;"+
                        "line-height: 1.25;"+
                        "outline: none;"+
                        "color: rgba(0,0,0,0.6) !important;"+
                        "box-shadow: none;"+
                        "width: 100%;"+
                        "display: block;"+
                        "box-sizing: border-box;"+
                        "-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;"+
                        "transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;"+
                        "-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;"+
                        "transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;"+
                        "transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;"+
                    "}"+
                    ".mv-form-control input:focus {"+
                        "border: 1px solid rgba(0,0,0,0.35);"+
                    "}"+
                    ".mv-form-control input::-webkit-input-placeholder {"+
                        "color: rgba(0,0,0,.4);"+
                        "font-weight: 400;"+
                    "}"+
                    ".mv-form-control input::-moz-placeholder {"+
                        "color: rgba(0,0,0,.4);"+
                        "font-weight: 400;"+
                    "}"+
                    ".mv-form-control input:-ms-input-placeholder {"+
                        "color: rgba(0,0,0,.4);"+
                        "font-weight: 400;"+
                    "}"+
                    ".mv-form-control input:-moz-placeholder {"+
                        "color: rgba(0,0,0,.4);"+
                        "font-weight: 400;"+
                    "}"+
                    "#mv-form-2810NOwi83 .mv-form-control select.mv-select{"+
                        "font-family: 'Roboto', sans-serif;" +
                        "background: #f8f8f8 none repeat scroll 0 0;"+
                        "border: 1px solid #d9d9d9;"+
                        "border-radius: 0 !important;"+
                        "padding: 0 10px;"+
                        "height: 40px;"+
                        "width: 100%;"+
                        "font-family: 'Roboto', FontAwesome;"+
                        "font-size: 14px;"+
                        "font-weight: 400;"+
                        "-webkit-appearance: none;"+
                        "display: block" +
                    "}"+
                    ".mv-form-control input.error, #mv-form-2810NOwi83 .mv-form-control select.mv-select.error{"+
                        "border-bottom: 1px solid #ff7c6a;"+
                    "}"+
                    "#mv-form-2810NOwi83 .mv-form-control select.mv-select::after{"+
                        "content: \"v\";"+
                        "position: absolute;"+
                        "right: 0;"+
                    "}"+
                    ".mv-form-control-buttons{"+
                        "text-align: right;"+
                        "margin-top: 10px;"+
                    "}"+
                    ".mv-form-control-buttons button{"+
                        "font-family: 'Roboto', sans-serif;" +
                        "background: #e53935;"+
                        "text-shadow: none;"+
                        "min-width: 105px;"+
                        "height: 40px;"+
                        "margin: 0;"+
                        "padding: 0 20px;"+
                        "border: none;"+
                        "font-size: 14px;"+
                        "font-weight: 300;"+
                        "line-height: 40px;"+
                        "color: #fff;"+
                        "-webkit-box-shadow: 0px 0px 6px -2px rgba(0,0,0,0.75);"+
                        "-moz-box-shadow: 0px 0px 6px -2px rgba(0,0,0,0.75);"+
                        "box-shadow: 0px 0px 6px -2px rgba(0,0,0,0.75);"+
                        "outline: none;"+
                        "cursor: pointer;"+
                    "}"+
                    ".mv-form-control-buttons small{"+
                        "float: left;"+
                        "color: #afafaf;"+
                        "font-weight: 400;"+
                        "margin-top: 10px;"+
                    "}"+
                    ".form-error-29837651{"+
                        "color: #e67302;"+
                        "margin: 5px 0 0 5px;"+
                        "font-weight: 300;"+
                        "font-size: 14px;"+
                        "display: none;"+
                    "}"+
                    "#mv-form-2810NOwi83 .mv-row{"+
                        "margin-right: -15px;"+
                        "margin-left: -15px;"+
                        "box-sizing: border-box;"+
                        "display: table;"+
                        "width: 106%;"+
                    "}"+
                    "#mv-form-2810NOwi83 .mv-row::before{"+
                        "display: table;"+
                        "content: \" \";"+
                    "}"+
                    ".mv-col-9, .mv-col-8, .mv-col-6, .mv-col-4, .mv-col-3{"+
                        "position: relative;"+
                        "padding-right: 15px;"+
                        "padding-left: 15px;"+
                        "box-sizing: border-box;"+
                        "float: left;"+
                    "}"+
                    ".mv-col-9{"+
                        "width: 75%;"+
                    "}"+
                    ".mv-col-8{"+
                        "width: 66.66666667%;"+
                    "}"+
                    ".mv-col-6 {"+
                    " width: 50%;"+
                    "}"+
                    ".mv-col-4{"+
                        "width: 33.33333333%;"+
                    "}"+
                    ".mv-col-3{"+
                        "width: 25%;"+
                    "}"+
                    "@media(max-width: 480px){"+
                        ".mv-col-9{"+
                            "width: 100%;"+
                        "}"+
                        ".mv-col-8{"+
                            "width: 100%;"+
                        "}"+
                        ".mv-col-6{"+
                            "width: 100%;"+
                        "}"+
                        ".mv-col-4{"+
                            "width: 100%;"+
                        "}"+
                        ".mv-col-3{"+
                            "width: 100%;"+
                        "}"+
                        ".mv-form-control-buttons{"+
                            "text-align: center"+
                        "}"+
                        ".mv-form-control-buttons button{"+
                            "margin-top: 10px;"+
                        "}"+
                        ".mv-container-482j83nKH37{"+
                            "padding-top: 80px;"+
                        "}"+
                    "}"+
                    ".mv-already-registered-msg{"+
                        "margin-top: 10px;"+
                    "}"+
                    ".mv-already-registered-msg p{"+
                        "font-family: 'Roboto', sans-serif;" +
                        "font-weight: 400;"+
                        "color: #000;"+
                        "text-align: justify;"+
                        "font-size: 1em;"+
                        "display: table;"+
                        "background: #eceff1;"+
                        "padding: 20px 15px;"+
                        "border-radius: 5px;"+
                        "line-height: 22px;"+
                        "border: 1px solid #ccc;"+
                    "}"+
                    ".mv-already-registered-msg p span{"+
                        "text-align: center;"+
                        "font-size: 1.5em;"+
                        "font-family: 'Roboto', sans-serif;" +
                        "display: block;"+
                        "margin: 5px 0;"+
                        "color: rgba(0,0,0,0.4);"+
                    "}"+
                    ".mv-footer-3IdmKJ3N394XN {"+
                        "position: absolute;"+
                        "bottom: 3px;"+
                        "left: 0;"+
                        "width: 100%;"+
                        //"background: #fafafa;"+
                        "padding-bottom: 5px;"+
                    "}"+
                    ".mv-footer-3IdmKJ3N394XN p{"+
                        "text-align: center;"+
                        "margin: 5px 0;"+
                        "padding-top: 5px;"+
                        "color: rgba(0,0,0,0.3);"+
                        "font-size: 14px;" +
                        "font-weight: 400;"+
                    "}"+
                    ".mv-footer-3IdmKJ3N394XN p:before{"+
                        "content: '';"+
                        "width: 90%;"+
                        "position: absolute;"+
                        "top: 0;"+
                        "left: 0;"+
                        "right: 0;"+
                        "margin: auto;"+
                        "height: 1px;"+
                        "background: #f7f7f7;"+
                    "}"+
                    ".mv-footer-3IdmKJ3N394XN p a{"+
                        "color: #ffc9ce;"+
                        "text-decoration: none;"+
                        "opacity: 0.5;"+
                    "}"+
                    ".mv-footer-3IdmKJ3N394XN p a:hover{"+
                        "opacity: 1;"+
                    "}"+
                    ".mv-footer-3IdmKJ3N394XN p a img{"+
                        "width: 100px;"+
                        "height: auto;"+
                    "}"+
                    ".mv-flat-btn-298309{"+
                        "background: none;"+
                        "font-family: 'Roboto', sans-serif;" +
                        "border: 0;"+
                        "font-size: 13px;"+
                        "font-weight: 400;"+
                        "text-transform: uppercase;"+
                        "color: #e53935;"+
                        "cursor: pointer;"+
                        "padding: 10px;"+
                    "}"+
                    ".mv-flat-btn-298309:hover{"+
                        "background: rgba(0,0,0,0.1);"+
                    "}"+
                    ".mv-custom-btn-29509{"+
                        "background: #e53935;"+
                        "border: 0;"+
                        "font-family: 'Roboto', sans-serif;" +
                        "font-size: 13px;"+
                        "color: #fff;"+
                        "font-weight: 400;"+
                        "text-transform: uppercase;"+
                        "padding: 15px 20px;"+
                        "cursor: pointer;"+
                        "-webkit-box-shadow: 0px 0px 6px -2px rgba(0,0,0,0.75);"+
                        "-moz-box-shadow: 0px 0px 6px -2px rgba(0,0,0,0.75);"+
                        "box-shadow: 0px 0px 6px -2px rgba(0,0,0,0.75);"+
                    "}"+
                    ".mv-custom-btn-29509.close-mdn{"+
                        "background: #eceff1;"+
                        "color: #546e7a;"+
                        "border: 1px solid #b0bec5;"+
                        "font-weight: 500;"+
                        "padding: 8px 15px;"+
                    "}"+
                    ".mv-container-3928620PN101039387 h4{"+
                        "text-align: center;"+
                        "font-family: 'Roboto', sans-serif;" +
                        "font-weight: 500;"+
                        "font-size: 1.3em;"+
                        "margin: 5px 0 20px 0;"+
                    "}"+
                    ".mv-container-3928620PN101039387 p{"+
                        "font-family: 'Roboto', sans-serif;" +
                        "font-weight: 300;"+
                        "display: table;"+
                        "color: #757575;"+
                        "word-spacing:-1px;" +
                        "padding: 15px;"+
                        "line-height: 22px;"+
                        "text-align: justify;"+
                        "font-size: 15px;"+
                        "border-radius: 5px;"+
                        "border: 1px solid #ffca28;"+
                        "box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);"+
                    "}"+
                    ".mv-container-3928620PN101039387 p.info{"+
                        "background: #fff8e1;"+
                    "}"+
                    ".mv-container-3928620PN101039387 p.success{"+
                        "background: #fff;"+
                        "border: 1px solid #5f9777;"+
                        "color: #5f9777;"+
                        "box-shadow: none"+
                    "}"+
                    ".mv-alert-829171377kUe92m93M390167{"+
                        "position: fixed;"+
                        "z-index: 999;"+
                        "width:100%;"+
                        "min-height: 300px;"+
                        "max-height: 100%;"+
                        "overflow-y: auto;"+
                        "text-align: center;"+
                        "top:0;"+
                        "left:0;"+
                        "height: 100%;"+
                        "background: rgba(0,0,0,0.1)"+
                    "}"+
                    ".mv-alert-829171377kUe92m93M390167 .alert-container-4579{"+
                        "font-family: 'Roboto', sans-serif;" +
                        "box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3);"+
                        "position: absolute;"+
                        "background: #fff;"+
                        "border-radius: 2px;"+
                        "padding: 20px;"+
                    "}"+
                    ".mv-alert-829171377kUe92m93M390167 h4{"+
                        "margin: 10px 0 20px 0;"+
                        "font-family: 'Roboto', sans-serif;" +
                        "color: #f4511e;"+
                        "font-weight: 500;"+
                        "font-size: 100%;"+
                        "text-transform: uppercase;"+
                    "}"));
                this.globalStyle.appendChild(this.head[0]);
                this.globalStyle.appendChild(this.head[1]);
            }
            docFrag = document.createDocumentFragment();
            this.mainContainer = document.createElement("div");
            // Create modal element
            this.modal = document.createElement("div");
            this.modal.id = "mv-modal-container";
            this.modal.className = "mv-modal " + this.options.className;
            this.modal.style.position = "relative";
            this.modal.style.zIndex = "1000001";
            this.modal.style.width = "100%";
            this.modal.style.maxWidth = "595px";
            this.modal.style.backgroundColor = "#fff";
            this.modal.style.padding = "30px 30px 60px 30px";
            // If closeButton option is true, add a close button
            if (this.options.closeButton === true) {
                this.closeButton = document.createElement("button");
                this.closeButton.className = "mv-close close-button";
                this.closeButton.innerHTML = "×";
                this.closeButton.style.position = "absolute";
                this.closeButton.style.top = "5px";
                this.closeButton.style.right = "5px";
                this.closeButton.style.zIndex = "10";
                this.closeButton.style.border = 0;
                this.closeButton.style.background = "transparent";
                this.closeButton.style.fontSize = "24px";
                this.closeButton.style.color = "rgba(0,0,0,0.45)";
                this.closeButton.style.cursor = "pointer";
                this.modal.appendChild(this.closeButton);
            }
            // If overlay is true, add one
            if (this.options.overlay === true) {
                this.overlay = document.createElement("div");
                this.overlay.className = "mv-overlay " + this.options.className;
                this.overlay.style.position = "fixed";
                this.overlay.style.width = "100%";
                this.overlay.style.height = "100%";
                this.overlay.style.zIndex = "100000";
                this.overlay.style.top = 0;
                this.overlay.style.left = 0;
                this.overlay.style.backgroundColor = "rgba(0,0,0,0.4)";
                docFrag.appendChild(this.overlay);
            }
            this.loader = document.createElement("div");
            this.loader.id = "mv-loader-286j257HBG2k81n0396mP2J2u200197273452a";
            this.loader.style.position = "absolute";
            this.loader.style.width = "100%";
            this.loader.style.height = "100%";
            this.loader.style.textAlign = "center";
            this.loader.style.zIndex = "5";
            this.loader.style.top = 0;
            this.loader.style.left = 0;
            this.loader.style.background = "rgba(255,255,255,0.8)";
            this.loader.innerHTML = '<img height="35" width="35" style="position:absolute; top: 50%; margin-top: -15px; left: 50%; border: 0;" src="data:image/gif;base64,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" />'+
                                    '<br><small style="position:absolute;top:calc(50% + 35px);font-weight: 100;margin-left: -5px;">Aguarde</small>';
            this.modal.appendChild(this.loader);
            this.mainContainer.appendChild(this.modal);
            var footer = footerContent();
            this.modal.appendChild(footer);
            contentHolder = document.createElement("div");
            this.mainContainer.id = "mv-container-482j83nKH37"
            this.mainContainer.style.position = "absolute";
            this.mainContainer.style.zIndex = "10000000000"
            this.mainContainer.style.left = 0;
            this.mainContainer.style.height = "100%";
            this.mainContainer.style.width = "99.9%";
            contentHolder.className = "mv-modal-header";
            docFrag.appendChild(this.mainContainer);
            document.body.appendChild(docFrag);
            var mcId = document.getElementById("mv-container-482j83nKH37");
            var mContainer = document.getElementById("mv-modal-container");
            var winHeight = window.innerHeight;
            var bodyHeight = document.body.scrollHeight
            var th = this;
            this.mainContainer.style.top = scrollTop+'px';
            this.mainContainer.style.height = winHeight;
            if(window.innerWidth < 400){
                th.mainContainer.style.paddingTop = 80;
            }
            /* check voucher by token */
            var vParams = "token="+this.clientId+"&id="+this.options.offerId;
            var vUrl = this.apiUrl+"/voucher/get";
            showLoader(true);
            sendRequest.call(this,vUrl,vParams,contentCreate);
        }
        function showLoader(show){
            var load = document.getElementById("mv-loader-286j257HBG2k81n0396mP2J2u200197273452a");
            if(show){
                load.style.display = "block";
            }else{
                load.style.display = "none";
            }
        }
        function showAlert(show,title,content,call){
            var callback = (!call) ? this.close : call;
            var modalEl = document.getElementById("mv-elert-829171377kUe92m93M39016");
            var _this = this;
            if(show)
                createAlertModal.call(this, title, content,callback);
            else
                _this.alert.parentNode.removeChild(_this.alert);
        }
        function createAlertModal(t,c,callback){
            var alertContainer, modalW, alertW, modalId, alertId, btn, _this;
            _this = this;
            _this.alert = document.createElement("div");
            _this.alert.className = "mv-alert-829171377kUe92m93M390167";
            alertContainer = document.createElement("div");
            alertContainer.id = "mv-elert-829171377kUe92m93M39016";
            alertContainer.className = "alert-container-4579";
            alertContainer.style.minWidth = "250px";
            alertContainer.style.display = "block";
            alertContainer.style.fontFamily = "font-family: 'Roboto', sans-serif";
            alertContainer.style.maxWidth = "400px";
            setTimeout(function(){
                alertContainer.style.left = Math.ceil((_this.modal.offsetWidth/2) - (alertContainer.offsetWidth/2))+"px";
                alertContainer.style.top = Math.ceil((_this.modal.offsetHeight/2) - (alertContainer.offsetHeight/2))+"px";
            },200)
            alertContainer.innerHTML = "<h4 id=\"mv-alert-title-28j38HiWO2938\">"+t+"</h4>"+
                                        "<div style=\"font-weight: 500;margin-bottom: 10px; font-family: 'Roboto', sans-serif; color: rgba(0,0,0,0.5);\" id=\"mv-alert-content-KWM2p383620sm28\">"+c+"</div>" +
                                        "<button style=\"font-family: 'Roboto', sans-serif\" id=\"mv-alert-btn-8372j26sp20JSi2M2ny37\">OK</button>";
            
            _this.alert.appendChild(alertContainer);
            _this.modal.appendChild(_this.alert);
            btn = document.getElementById("mv-alert-btn-8372j26sp20JSi2M2ny37");
            btn.addEventListener("click", function(e){
                if(!callback) showAlert.call(_this);
                else callback.call(_this);
            })
        }
        function contentCreate(r){
            showLoader(false);
            if(!r.error){
                this.modal.appendChild(this.header);
                this.modal.appendChild(this.stepProgress);
                stepNextForm.call(this);
            }else{
                var title, content;
                if(r.error == "voucher does not exists or expired"){
                    title = "Oferta expirada";
                    content = "Desculpe-nos, essa oferta não está mais disponível."
                }else{
                    title = "OOOPS!";
                    content = "Nosso sistema esta em manutenção. por gentileza retorne mais tarde, estamos trabalhando para melhor atendê-lo."
                }
                showAlert.call(this,true,title,content)
            }
        }
        function headerContents(){
            var hElement = document.createElement("div");
            var hTitle = document.createElement("h3");
            var hSubtitle = document.createElement("p");
            hTitle.className = "mv-form-wizard-title";
            hSubtitle.className = "mv-form-wizard-subtitle";
            hTitle.innerText = "Gerar Voucher";
            hSubtitle.innerText = "Complete as etapas do formulário para gerar o voucher.";
            hElement.appendChild(hTitle);
            hElement.appendChild(hSubtitle);        
            return hElement;
        }
        function footerContent() {
            var footerContainer, imgSvg;
            imgSvg = "data:image/png;base64,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";
            footerContainer = document.createElement("div");
            footerContainer.className = "mv-footer-3IdmKJ3N394XN";
            footerContainer.innerHTML = '<p><a href="http://meuvoucher.com" target="_blank" title="Cirado e gerido por MeuVoucher.com"><img src="'+imgSvg+'"></a></p>';
            return footerContainer;
        }
        function _stepsPrg(){
            var _st, _progress, _pline;
            _st = document.createElement("div");
            _progress = document.createElement("div");
            _pLine = document.createElement("div");
            _pLine.id = "mv-progress-line-39285QpkSJMPA2980001"
            _st.className = "mv-form-wizard-steps";
            _progress.className = "mv-form-wizard-progress";
            _pLine.className = "mv-form-wizard-progress-line";
            _pLine.style.width = !this.progress ? "13.25%" : this.progress;
            this.stepOne = createStep(true, 0, 'Validar email');
            this.stepTwo = createStep(false, 1, 'Confirmar dados');
            this.stepThree = createStep(false, 2, 'Gerar voucher');
            _progress.appendChild(_pLine);
            _st.appendChild(_progress);
            _st.appendChild(this.stepOne);
            _st.appendChild(this.stepTwo);
            _st.appendChild(this.stepThree);
            return _st;
        }
        function createStep(en, key, text){
            var mStep, iconStep, contStep, icons, _text;
            icons = {
                0: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkI2MTFENzk1QjcwMTFFNzk3Mzk4NjNGN0Y5RENGN0IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkI2MTFEN0E1QjcwMTFFNzk3Mzk4NjNGN0Y5RENGN0IiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQjYxMUQ3NzVCNzAxMUU3OTczOTg2M0Y3RjlEQ0Y3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQjYxMUQ3ODVCNzAxMUU3OTczOTg2M0Y3RjlEQ0Y3QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnZ6YlEAAAFQSURBVHjapNQ/KAZhHMDxu/PexCADivnNJJLBosi72DC8g3pLDDYGi2JhsL2DQVKURYa3KOkdFUpGjAaTmUHJPe975/vjd7re7nLve099uut6nu97f1/b87xRy7LO0GdlGwYlm+ArOzVcZQwOoF+CATsnmG+l4rru7+kZs8im7OjxSbRnPMNZtIXBXhwj19LNM2aZzXQ0+IY5XKC7iZZDbIPtnjb+ghJa0kt/xGCKWCcusY0K1uUHJBjohEMU8KlPvCQTEmJjuMMEVlDUdT/BWmTiNYbxovd0JyY2g1u97wWe8i4CPTG/MSjjHVM4whqqyKMDWzjFA8ZxE1lnSzQXEwyj8l7dYx9P+ECXBuWd9WPW1ZOC4TjQ6II+BHl45wkxGf5/QUsvbzXla1R3UgSbGb58y8/6T1HJGBvBkATlkymjp2GCnbAwSDj+hc1vAQYAw7ldKhwUEdQAAAAASUVORK5CYII=",
                1: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkI2MTFEN0Q1QjcwMTFFNzk3Mzk4NjNGN0Y5RENGN0IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkI2MTFEN0U1QjcwMTFFNzk3Mzk4NjNGN0Y5RENGN0IiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQjYxMUQ3QjVCNzAxMUU3OTczOTg2M0Y3RjlEQ0Y3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQjYxMUQ3QzVCNzAxMUU3OTczOTg2M0Y3RjlEQ0Y3QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoL5cGkAAAFdSURBVHjarNQ9SMNAGMZxExsVBMEPcNVBcNfJQRAcCg51EAWpuAguBYcKgl+TOHURFEF00C6CnToUXJXOoogo6pBJLLopSALG/wtvIYZoEujBr01z3MPde3c1PM9ramRLua5r8L2ORfTEHHeNEVg4xCCylmXdp3hY08ACbuJMAk/4RgazkEldMrmM4TiOzY8zLCdYWb+O2UI7jtAK2+SjA68JwoZxgUeU0I20ZmyYCWs+jgoOMIZm7GAUfdSwmCRQanWCPeTRq+9rOCfsq17gqCYFX8ECjrGKFu17wARhz/4di9rRXQ2rabChfVVMEvbmHxC15CIGpD648oWVtJ4fwQFmjB29QxtykDrtYwbzKIctKarl9GjIzdjWsyf3dSpsvLz4RNcfYQUNk3YamFEnXsIC5Sgs4R23gX5b1VtayyRXbgjTYYGb+pz/Z6bBJsdkTq/f7zPW6L+vHwEGAA2HS4X2mOx+AAAAAElFTkSuQmCC",
                2: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjgyNUNCNTA1QjcyMTFFNzk3Mzk4NjNGN0Y5RENGN0IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjgyNUNCNTE1QjcyMTFFNzk3Mzk4NjNGN0Y5RENGN0IiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQjYxMUQ3RjVCNzAxMUU3OTczOTg2M0Y3RjlEQ0Y3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQjYxMUQ4MDVCNzAxMUU3OTczOTg2M0Y3RjlEQ0Y3QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkYiOuMAAAFnSURBVHjarJRPKEVBFIfvfb0bvRfS815RlBJFvMTGwspGyQpbNhZWUpY2srCyUFY2LG2klIUdsUHJWv4spURW9Jp61zd1RtN0Z2yc+pqZe2Z+c2bOuROnaRppU0q90LRG2TYr7aHH/5UkSUl38tbHRniGU+tbMyxCDmKZcwCv1pxx6DeDvLPTDTutEm0v/TcoiGAqgtq24AHa4Qk2bcGcGztieuE9LEV+m5E5ZdfhRhgRYYroPN27gOAlLMCn63AjLCM2RvsITTCSITYEFTn2MHTYztjK8kcgy9Oy+XEgy0X3yHPQ4FlwLUmZ8vhV1h2q6G+rOeML6ILO/zqyvssVTdaRtZ1IXf0mKXBvJtulUJZ1MV/BIHzDbYbIEZxLvw/aQoLGdmHS41uHfV/IvsLuofsORc86/UicmTxA3SdYRWzNGrd4BLulhHZgVH6AbVdQl8SA4JZKXR6ImrRV2IA9mIBlI/gjwAAg+mDqxov5RwAAAABJRU5ErkJggg=="
            }
            mStep = document.createElement("div");
            mStep.id = "mv-step-9301763976aP"+key;
            iconStep = document.createElement("div");
            contStep = document.createElement("div");
            _text = document.createElement("p");
            mStep.className = "mv-form-wizard-step";
            if(en) mStep.className = "mv-form-wizard-step active";
            iconStep.className = "mv-form-wizard-step-icon";
            contStep.style.paddingTop = "15px";
            contStep.style.fontFamily = "font-family: 'Roboto', sans-serif";
            contStep.style.lineHeight = "15px";
            contStep.innerHTML = "<img src='data:image/png;base64,"+icons[key]+"'>";
            _text.innerHTML = "<span style=\"font-family: 'Roboto', sans-serif\">"+text+"</span>";
            iconStep.appendChild(contStep);
            mStep.appendChild(iconStep);
            mStep.appendChild(_text);
            return mStep;
        }
        function stepNextForm(){
            var wb;
            this.stepContainer = document.createElement("div");
            this.activeForm = document.createElement("form");
            this.progBar = document.getElementById("mv-progress-line-39285QpkSJMPA2980001");
            this.stepRef = document.getElementById("mv-step-9301763976aP1");
            this.modalId = document.getElementById("mv-modal-container");
            this.activeForm.id = "mv-form-2810NOwi83";
            this.stepContainer.className = "mv-form-progress-info";
            this.modalId.appendChild(this.stepContainer);
            bindStep.call(this);
        }
        function bindStep(info){
            this.stepContainer.innerHTML = "<h4 style=\"font-family: 'Roboto', sans-serif;\">Informações do cadastro: <span>Etapa "+this.form+" - 3</span></h4>";
            showLoader(false);
            switch(this.form){
                case 1:
                    formStepOne.call(this) 
                break;
                case 2:
                    this.progBar.style.width = "50%";
                    this.stepRef.className = "mv-form-wizard-step active";
                    this.activeForm.parentNode.removeChild(this.activeForm);
                    if(info.error && info.error == "Customer does not exist") formStepTwo.call(this);
                    else alreadyInserted.call(this,info);
                break;
                case 3:
                    this.progBar.style.width = "100%";
                    this.stepRef = document.getElementById("mv-step-9301763976aP2");
                    this.stepRef.className = "mv-form-wizard-step active";
                    var f = document.getElementById("mv-form-2810NOwi83");
                    if(f) this.activeForm.parentNode.removeChild(this.activeForm);
                    finalStep.call(this, info);
                break;
            }
        }
        function alreadyInserted(customerData){
            var msgReg, next, me, _url, data, btnProfileData;
            me = this;
            msgReg = document.createElement("div");
            msgReg.className = "mv-already-registered-msg";
            msgReg.innerHTML = "<p>Verificamos que você já possui cadastro em nossa base de dados. Clique no botão abaixo se deseja editar ou visualizar seus dados ou prossiga pra gerar seu voucher."+
                    "<span>&#8595;</span>" +
                "</p>" +
                "<div style=\"text-align:center;margin-bottom:20px;\"><button class=\"mv-flat-btn-298309\" id=\"mv-btn-38294001QnWNGU839m837\">Meus dados cadastrais</button></div>" +
                "<div style=\"text-align:center;\"><button class=\"mv-custom-btn-29509\" id=\"mv-btn-82711NSJ2309k37l2p371\">PROSSEGUIR</button></div>";
            me.stepContainer.appendChild(msgReg);
            btnProfileData = document.getElementById("mv-btn-38294001QnWNGU839m837");
            next = document.getElementById("mv-btn-82711NSJ2309k37l2p371");
            next.addEventListener("click", function(e){
                e.preventDefault();
                _url = me.apiUrl+"/register/insert";
                data = "email="+me.emailRegister+"&token="+me.clientId+"&type="+me.options.offerId;
                sendRequest.call(me,_url,data,requestResult);
            })
            /* Actions profile data user request */
            btnProfileData.addEventListener("click", function(evt){
                evt.preventDefault();
                _url = me.apiUrl+"/customer/generate/token/"+customerData[0].id;
               sendRequest.call(me,_url,null,requestProfileUserData);
            })
        }
        function requestProfileUserData(r){
            var title, content;
            if(!r.error){
                title = "Solicitação concluida";
                content = "Encaminhamos para seu email informações sobre seus dados cadastrais. Cheque sua caixa de entrada e acesse o link para editar seus dados.";
                showAlert.call(this,true,title,content,showAlert);
            }
        }
        function finalStep(i){
            var cont, btnDismiss, th = this;
            console.log(i)
            cont = document.createElement("div");
            cont.className = "mv-container-3928620PN101039387";
            if(i.insert_details) {
                cont.innerHTML = "<h4 style=\"color: #5f9777\">Voucher gerado com sucesso!</h4>"+
                "<p class=\"success\">Você concluiu com sucesso as etapas do cadastro, seu voucher foi gerado e poderá ser visualizado clicando no botão abaixo ou através do link enviado ao seu email com as informações necessárias. Agradecemos seu interesse em nossa oferta, esperamos que aproveite-a.</p>" +
                '<div style="text-align:center;margin-top: 30px;"><a href="'+this.voucherUrl+'/'+i.customer_info.history.cod_reference+'" target="_blank" style="text-decoration: none;" class="mv-custom-btn-29509">VISUALIZAR VOUCHER</a></div>';
            }
            else {
                cont.innerHTML = "<h4>O voucher já foi emitido!</h4>"+
                "<p class=\"info\">Verificamos que você já emitiu um voucher pra essa oferta anteriormente. enviamos para seu email as informações do voucher, verifique em sua caixa de entrada ou na caixa de spam caso seu provedor de emails o tenha marcado indevidamente.</p>" +
                "<div style=\"text-align:center;margin-top: 30px;\"><button id=\"btn-mv-92Im220kOM91\" class=\"mv-custom-btn-29509 close-mdn\">FECHAR</button></div>";
            }
            this.stepContainer.appendChild(cont);
            setTimeout(function(){
                btnDismiss = document.getElementById("btn-mv-92Im220kOM91");
                //btnVoucherLink = document.getElementById("btn-mv-92Im220kOM91");
                btnDismiss.addEventListener("click", function(e){
                    e.preventDefault();
                    th.close.bind(th);
                })
            },300)
        }
        function formStepOne(){
            var fieldEmail = '<div class="mv-form-control">'+
                                '<label for="mv-input-email">Entre com seu email <span>*</span></label>'+
                                '<input name="email" id="mv-input-email" placeholder="Digite aqui seu email" class="form-control required" type="text">'+
                                '<p id="mv-email-error" class="form-error-29837651"></p>' +
                            '</div>'+
                            '<div class="mv-form-control-buttons">'+
                                '<small style="font-family: \'Roboto\', sans-serif;">* Preenchimento obrigatório.</small>'+
                                '<button type="submit">PROSSEGUIR</button>' +
                            '</div>';
            this.activeForm.innerHTML = fieldEmail; 
            this.modalId.appendChild(this.activeForm);
            var _self = this;
            this.activeForm.addEventListener('submit', function(e){
                e.preventDefault();
                checkEmail.call(_self);
            });
        }
        function checkEmail(){
            var form, email, emailError;
            form = document.getElementById("mv-form-2810NOwi83");
            email = form.elements["email"].value;
            emailError = document.getElementById("mv-email-error");
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
            if (!re.test(form.elements["email"].value)){
                emailError.style.display = "block";
                emailError.innerHTML = "Por favor informe um email válido!";
                return;
            }
            this.emailRegister = email;
            var param = "email="+email;
            var url = this.apiUrl+"/register/find";
            showLoader(true);
            sendRequest.call(this,url,param,requestResult);
        }
        function formStepTwo(){
            this.activeForm = document.createElement("form");
            this.activeForm.id = "mv-form-2810NOwi83";
            var fieldsFormTwo = '<div class="mv-form-control">'+
                                    '<div class="mv-row">' +
                                        '<div class="mv-col-9">' +
                                            '<label for="mv-input-fullname">Nome Completo <span>*</span></label>'+
                                            '<input name="fullname" id="mv-input-fullname" placeholder="Digite aqui seu nome" class="form-control required" type="text">'+
                                            '<p id="mv-name-error" class="form-error-29837651"></p>' +
                                        '</div>'+
                                        '<div class="mv-col-3">' +
                                            '<label for="mv-input-gender">Sexo <span>*</span></label>'+
                                            '<select id="mv-input-gender" name="gender" class="mv-select"><option>Selecione</option><option value="M">Masculino</option><option value="F">Feminino</option></select>' +
                                        '</div>'+
                                    '</div>'+
                            '</div>'+
                            '<div class="mv-form-control">'+
                                '<div class="mv-row">' +
                                    '<div class="mv-col-6">' +
                                        '<label for="mv-input-phone">Telefone <span>*</span></label>'+
                                        '<input name="phone" id="mv-input-phone" placeholder="Ex: (61) 3321-1234" class="form-control" type="text">'+
                                    '</div>' +
                                    '<div class="mv-col-6">' +
                                        '<label for="mv-input-birthday">Data de nascimento <span>*</span></label>'+
                                        '<input name="birthday" id="mv-input-birthday" placeholder="Ex: 30/01/1980" class="form-control" type="text">'+
                                    '</div>' +
                                '</div>'+
                            '</div>'+
                            '<div class="mv-form-control">'+
                                '<div class="mv-row">' +
                                    '<div class="mv-col-3">' +
                                        '<label for="mv-input-state">Estado <span>*</span></label>'+
                                        '<select id="mv-input-state" name="state" class="mv-select">'+
                                            '<option>Selecione</option><option>DF</option><option>GO</option>'+
                                        '</select>' +
                                    '</div>' +
                                    '<div class="mv-col-9">' +
                                        '<label for="mv-input-city">Cidade <span>*</span></label>'+
                                        '<input name="city" id="mv-input-city" placeholder="Cidade" class="form-control" type="text">'+
                                    '</div>' +
                                '</div>'+
                            '</div>'+
                            '<input type="hidden" name="email" value="'+this.emailRegister+'">'+
                            '<p id="mv-form-error-2873hN237BV392" class="form-error-29837651">Por favor preencha os campos obrigatórios.</p>'+
                            '<div class="mv-form-control-buttons">'+
                                '<small>* Preenchimento obrigatório.</small>'+
                                '<button type="submit">PROSSEGUIR</button>' +
                            '</div>';
            this.activeForm.innerHTML = fieldsFormTwo; 
            this.modalId.appendChild(this.activeForm);
            var _self = this;
            var bMask = document.getElementById("mv-input-birthday");
            var phMask = document.getElementById("mv-input-phone");
            bMask.addEventListener("keyup", function(){
                mask("mv-input-birthday", "00/00/0000", Event);
            })
            phMask.addEventListener("keyup", function(){
                mask("mv-input-phone", "(00) 00000-0000", Event);
            })
            this.activeForm.addEventListener('submit', function(e){
                e.preventDefault();
                formValidation.call(_self)
            });
        }
        function formValidation(form){
            var form, fError=0, url, params, itens="", _this, errorId;
            _this = this;
            form = document.getElementById("mv-form-2810NOwi83").elements;
            for(var x=0;x<form.length - 1;x++){
                if(form[x].value == "" || form[x].value == "Selecione"){
                    if(!form[x].classList.contains("error"))
                        form[x].className += " error";
                    fError += 1
                }else{
                    if(form[x].name == "birthday")
                         itens += form[x].name+'='+form[x].value.split('/').reverse().join('-')+"&";
                     else
                         itens += form[x].name+'='+form[x].value+"&";
                    if(form[x].classList.contains("error")) form[x].classList.remove('error');
                }
            }
            if(fError >= 1){
                errorId = document.getElementById("mv-form-error-2873hN237BV392");
                errorId.style.display = "block";
                return
            } 
            params = itens;
            params +="token="+_this.clientId+"&type="+_this.options.offerId+"&via=internet-plugin";
            url = _this.apiUrl+"/register/insert";
            sendRequest.call(_this,url,params,requestResult);
        }
        function mask(inputName, mask, evt) {
            try {
                var text = document.getElementById(inputName);
                var value = text.value;
                // If user pressed DEL or BACK SPACE, clean the value
                try {
                    var e = (evt.which) ? evt.which : event.keyCode;
                    if ( e == 46 || e == 8 ) {
                    text.value = "";
                    return;
                    }
                } catch (e1) {}
                var literalPattern=/[0\*]/;
                var numberPattern=/[0-9]/;
                var newValue = "";
                for (var vId = 0, mId = 0 ; mId < mask.length ; ) {
                    if (mId >= value.length)
                    break;
                    // Number expected but got a different value, store only the valid portion
                    if (mask[mId] == '0' && value[vId].match(numberPattern) == null) {
                    break;
                    }
                    // Found a literal
                    while (mask[mId].match(literalPattern) == null) {
                    if (value[vId] == mask[mId])
                        break;
                    newValue += mask[mId++];
                }
                newValue += value[vId++];
                mId++;
                }
                text.value = newValue;
            } catch(e) {}
        }
        function requestResult(r){
            this.form += 1;
            bindStep.call(this, r);
        }
        /* Ajax method */
        function sendRequest(url,postData,requestResult) {
            var req, method, _this, aTitle, aText;
            req = createXMLHTTPObject();
            _this = this;
            if (!req){ 
                showLoader(false);
                aTitle = "SERVIDOR INACESSÍVEL";
                aText = "Nosso sistema esta em manutenção. por gentileza retorne mais tarde, estamos trabalhando para melhor atendê-lo."
                showAlert.call(_this,true,aTitle,aText,_this.close);
                return
            };
            method = (postData) ? "POST" : "GET";
            req.open(method,url,true);
            if (postData)
                req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            req.onreadystatechange = function () {
                if (req.readyState != 4){ 
                    return
                };
                if (req.status != 200 && req.status != 304) {
                    showLoader(false);
                    aTitle = "ERRO";
                    aText = "Não foi possível estabelecer conexão com o servidor"
                    showAlert.call(_this,true,aTitle,aText,_this.close);
                    return;
                }
                var response = JSON.parse(req.response);
                if(response.error){
                    if(response.error == "Customer does not exist"){
                        requestResult.call(_this,response);
                        return;
                    }else{
                        aTitle = "OFERTA INDISPONÍVEL";
                        aText = "Desculpe-nos, essa oferta não esta disponível no momento."
                        showAlert.call(_this,true,aTitle,aText,_this.close);
                        return;
                    }
                }
                requestResult.call(_this,response);
            }
            if (req.readyState == 4) return;
            req.send(postData);
        }
        var XMLHttpFactories = [
            function () {return new XMLHttpRequest()},
            function () {return new ActiveXObject("Msxml2.XMLHTTP")},
            function () {return new ActiveXObject("Msxml3.XMLHTTP")},
            function () {return new ActiveXObject("Microsoft.XMLHTTP")}
        ];
        function createXMLHTTPObject() {
            var xmlhttp = false;
            for (var i=0;i<XMLHttpFactories.length;i++) {
                try {
                    xmlhttp = XMLHttpFactories[i]();
                }
                catch (e) {
                    continue;
                }
                break;
            }
            return xmlhttp;
        }
        function initializeEvents() {
            if (this.closeButton) {
                this.closeButton.addEventListener('click', this.close.bind(this));
            }
            if (this.overlay) {
                this.overlay.addEventListener('click', this.close.bind(this));
            }
        }
        function extendDefaults(source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }
        // Utility method to determine which transistionend event is supported
        function transitionSelect() {
            var el = document.createElement("div");
            if (el.style.WebkitTransition) return "webkitTransitionEnd";
            if (el.style.OTransition) return "oTransitionEnd";
            return 'transitionend';
        }
    }());

YUI.add("moodle-tinymce_mathslate-config",function(e,t){M&&(M.tinymce_mathslate=M.tinymce_mathslate||{});var n=M&&M.tinymce_mathslate||{},r={EDITOR:"mathslate-tinymce",TOOLBOX:"mathslate-toolbox",DRAGNODE:"mathslate-toolbox-drag",UNDO:"mathslate-undo-button",REDO:"mathslate-redo-button",CLEAR:"mathslate-clear-button",HELP:"mathslate-help-button"};n.TabEditor=function(t,i,s){var o=new n.Editor(t,s);this.me=o;var u=o.mje;this.node=e.one("#"+i),this.node.setHTML(M.util.get_string("nomathjax","tinymce_mathslate"));if(typeof MathJax=="undefined")return;this.node.addClass(r.EDITOR),this.node.setHTML('<div id="'+i+'" class="'+r.TOOLBOX+'">'+'<div style="background-color: white; color: green; height: 300px; line-height: 75px; font-size: 18px; text-align:center"><br />Mathslate Mathematics Editor<br />'+'</div><script type="math/tex">\\quad</script><math> <mo> </mo></math></div>');var a=o.tbox;MathJax.Hub.Queue(["Typeset",MathJax.Hub,i]),this.fillToolBox=function(t,n){t.forEach(function(e){e.tools.push(["br",{}])});var r=o.tbox.fillToolBox(t,n);this.tabs=t,e.one("#"+n).all(".yui3-tab-panel span").each(function(e){var n=o.tbox.getToolByID(e.getAttribute("id"));if(n){var r=e.get("parentNode").get("parentNode").get("children").indexOf(e.get("parentNode"));n.parent=t[e.get("parentNode").get("parentNode").get("parentNode").get("children").indexOf(e.get("parentNode").get("parentNode"))].tools;var i=n.parent[r];n.snippet=i,n.remove=function(){return this.parent.splice(this.parent.indexOf(i),1)}}}),this.registerTab=function(n){var r=new e.DD.Drop({node:n});r.on("drop:hit",function(r){var i=r.drag.get("node").getAttribute("id"),s=n.get("parentNode").get("children").indexOf(n),o=a.getToolByID(i);t[s].tools.push(o.remove()),o.parent=t[s].tools,n.get("parentNode").get("parentNode").get("children").item(1).one('[aria-labelledby="'+n.one("a").getAttribute("id")+'"]').appendChild(e.one("#"+i).get("parentNode")),this.outputJSON()},this)},this.outputJSON=function(){var n="[",r=[];this.registerBreaks(),this.tabs.forEach(function(n){var s=[];if(!e.one("#"+i).one(".yui3-tabview-content").get("children").item(0).get("children").item(t.indexOf(n)))return;var o=e.one("#"+i).one(".yui3-tabview-content").get("children").item(0).get("children").item(t.indexOf(n)).one("a").getAttribute("id");e.one("#"+i).one(".yui3-tabview-content").get("children").item(1).one('[aria-labelledby="'+o+'"]').get("children").each(function(e){var t=e.one(".yui3-dd-drop");t&&s.push("\n            "+a.getToolByID(t.getAttribute("id")).json),e.test("br")&&e.next()&&(!e.next().next()||!e.next().next().test("br"))&&s.push('\n            ["br", {}]')}),r.push('\n    {"label": "'+n.label+'",\n        "tools": ['+s.join(",")+"]\n    }")}),n+=r.join(",")+"\n]",e.one("#json-data").getDOMNode().value=n},this.addLabel=function(t,n){var s=e.one("#"+i).one("ul").get("children").indexOf(e.one("#"+i).one(".yui3-tab-selected"));r.add({childType:"Tab",label:"<span title='"+t+"'>"+n+"</span>",content:"<span id='latex-input'></span>"},s),this.tabs.splice(s,0,{label:"<span title='"+t+"'>"+n+"</span>",content:"",tools:[]}),this.outputJSON(),this.registerTab(e.one("#"+i).one("ul").get("children").item(s))},this.removeTab=function(e){r.remove(e)},this.selectTab=function(e){r.selectChild(e)},this.shiftTab=function(t){var n=e.one("#"+i).one("ul").get("children").item(t),s=n.get("parentNode").get("parentNode").get("children").item(1).one('[aria-labelledby="'+n.one("a").getAttribute("id")+'"]');r.add({childType:"Tab",label:this.tabs[t].label,content:""},t-1),n=e.one("#"+i).one("ul").get("children").item(t-1);var o=n.get("parentNode").get("parentNode").get("children").item(1).one('[aria-labelledby="'+n.one("a").getAttribute("id")+'"]');s.get("children").each(function(e){o.appendChild(e)}),r.remove(t+1),this.tabs.splice(t-1,0,this.tabs.splice(t,1)[0]),this.registerTab(e.one("#"+i).one("ul").get("children").item(t-1)),this.outputJSON()}},this.registerTool=function(t){var n=this;e.one("#"+t.id).on("dblclick",function(){t.parent.splice(t.parent.indexOf(t.snippet),1),this.get("parentNode").remove(),t.remove(),n.outputJSON()});var r=new e.DD.Drop({node:"#"+t.id});r.on("drop:hit",function(r){var i=null,s=e.one("#"+r.drag.get("node").get("id")).get("parentNode");n.tabs.forEach(function(e){e.id===r.drag.get("node").get("id")&&(i=e)}),i=a.getToolByID(r.drag.get("node").get("id"));if(!i)return;this.get("node").get("parentNode").get("parentNode").insertBefore(s,this.get("node").get("parentNode")),t.parent.splice(t.parent.indexOf(t.snippet),0,i.remove),n.outputJSON()})},this.registerTools=function(){e.one("#"+i).all(".yui3-tab-panel span").each(function(e){var t=o.tbox.getToolByID(e.getAttribute("id"));t&&this.registerTool(t)},this),e.one("#"+i).all("li").each(function(e){this.registerTab(e)},this),this.registerBreaks()},this.registerBreaks=function(){e.one("#"+i).all(".mathslate-break").each(function(e){e.ancestor().remove()}),e.one("#"+i).all(".yui3-tab-panel-selected").each(function(e){e.append("<br />")}),e.one("#"+i).all("br").each(function(e){(!e.previous()||e.previous().test("br"))&&e.remove()}),e.one("#"+i).all("br").each(function(t){var n=e.Node.create('<span><span class="mathslate-break">&lt;br&gt;</span></span>');t.ancestor().insertBefore(n,t);var r=new e.DD.Drag({node:n.one("span")});r.on("drag:drophit",function(e){if(e.drop.get("node")&&e.drop.get("node").getAttribute("id")&&a.getToolByID(e.drop.get("node").getAttribute("id"))){var r=e.drop.get("node").ancestor();r.ancestor().insertBefore(n,r),r.ancestor().insertBefore(t,r),this.outputJSON()}},this),r.on("drag:end",function(){this.get("node").setStyle("top","0"),this.get("node").setStyle("left","0")})},this)};var f;e.on("io:success",function(t,n){t===f.id&&(e.one("#json-data").getDOMNode().value=n.response,MathJax.Hub.Queue(["fillToolBox",this,e.JSON.parse(n.response),i]),MathJax.Hub.Queue(e.bind(this.registerTools,this)))},this),s===undefined?f=e.io(n.config):f=e.io(s),this.addTool=function(t){t='["mrow", {}, '+t+"]";var n=
e.JSON.parse(t),r=e.one("#"+i).one(".yui3-tab-panel-selected"),s=new a.Tool(n);s.json=t,s.snippet=n,s.remove=function(){return this.parent.splice(this.parent.indexOf(n),1)};var o=e.one("#"+i).one("ul").get("children").indexOf(e.one("#"+i).one(".yui3-tab-selected"));s.parent=this.tabs[o].tools,s.parent.push(n);var f=e.Node.create("<span> "+u.toMathML(s.HTMLsnippet)+" </span>");r.get("children").pop()&&r.get("children").pop().previous()&&r.get("children").pop().test("br")?r.insertBefore(f,r.get("children").pop().previous()):r.append(f),MathJax.Hub.Queue(["Typeset",MathJax.Hub,f.getDOMNode()]),MathJax.Hub.Queue(["registerTool",a,s]),MathJax.Hub.Queue(["registerTool",this,s]),MathJax.Hub.Queue(["outputJSON",this])},e.one("#json-data").on("change",function(){var t=e.one("#json-data").getDOMNode().value;MathJax.Hub.Queue(["fillToolBox",this,e.JSON.parse(t),i]),MathJax.Hub.Queue(e.bind(this.registerTools,this))},this),e.one("#mathslate-tab-left").on("click",function(){var t=e.one("#"+i).one("ul").get("children").indexOf(e.one("#"+i).one(".yui3-tab-selected"));if(t<1)return;this.shiftTab(t),this.selectTab(t-1)},this),e.one("#mathslate-tab-right").on("click",function(){var t=e.one("#"+i).one("ul").get("children").indexOf(e.one("#"+i).one(".yui3-tab-selected"))+1;if(t>=this.tabs.length)return;this.shiftTab(t),this.selectTab(t)},this),e.one("#label-remove").on("click",function(){var t=e.one("#"+i).one("ul").get("children").indexOf(e.one("#"+i).one(".yui3-tab-selected"));this.removeTab(t),this.tabs.splice(t,1),this.outputJSON()},this),e.one("#label-add").on("click",function(){this.addLabel("title","label")},this),e.one("#mathslate-tab-label").on("click",function(){var t=e.one("#"+i).one(".yui3-tab-selected"),n=e.one("#"+i).one("ul").get("children").indexOf(e.one("#"+i).one(".yui3-tab-selected")),r=e.Node.create(this.tabs[n].label),s=e.Node.create('<input type="text" value="'+r.getHTML()+'"></input>');e.one("#mathslate-tab-text").appendChild(s),s.focus(),s.on("blur",function(){this.remove()}),s.on("change",function(){r.setHTML(this.getDOMNode().value),t.one("a").setHTML(""),t.one("a").appendChild(r),this.tabs[n].label="<span title='"+r.getAttribute("title")+"'>"+r.getHTML()+"</span>",MathJax.Hub.Queue(["Typeset",MathJax.Hub,t.getDOMNode()]),this.outputJSON()})},this),e.one("#mathslate-tab-title").on("click",function(){var t=e.one("#"+i).one(".yui3-tab-selected"),n=e.one("#"+i).one("ul").get("children").indexOf(e.one("#"+i).one(".yui3-tab-selected")),r=e.Node.create(this.tabs[n].label),s=e.Node.create('<input type="text" value="'+r.getAttribute("title")+'"></input>');e.one("#mathslate-tab-text").appendChild(s),s.focus(),s.on("blur",function(){this.remove()}),s.on("change",function(){r.setAttribute("title",this.getDOMNode().value),t.one("a").setHTML(""),t.one("a").appendChild(r),this.tabs[n].label="<span title='"+this.getDOMNode().value+"'>"+r.getHTML()+"</span>",MathJax.Hub.Queue(["Typeset",MathJax.Hub,t.getDOMNode()]),this.outputJSON()})},this)}},"@VERSION@",{requires:["dd-plugin","dd-drag","dd-proxy","dd-drop","event","event-delegate","event-valuechange","tabview","io-base","json","moodle-tinymce_mathslate-textool","moodle-tinymce_mathslate-mathjaxeditor","moodle-tinymce_mathslate-editor"]});

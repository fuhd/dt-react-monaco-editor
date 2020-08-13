(window.webpackJsonp=window.webpackJsonp||[]).push([[237],{2453:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"setupMode",(function(){return setupMode}));var Position,Range,Location,DiagnosticSeverity,Diagnostic,Command,TextEdit,TextDocumentEdit,Promise=monaco.Promise,WorkerManager=function(){function WorkerManager(defaults){var _this=this;this._defaults=defaults,this._worker=null,this._idleCheckInterval=setInterval((function(){return _this._checkIfIdle()}),3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange((function(){return _this._stopWorker()}))}return WorkerManager.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},WorkerManager.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},WorkerManager.prototype._checkIfIdle=function(){this._worker&&(Date.now()-this._lastUsedTime>12e4&&this._stopWorker())},WorkerManager.prototype._getClient=function(){return this._lastUsedTime=Date.now(),this._client||(this._worker=monaco.editor.createWebWorker({moduleId:"vs/language/json/jsonWorker",label:this._defaults.languageId,createData:{languageSettings:this._defaults.diagnosticsOptions,languageId:this._defaults.languageId}}),this._client=this._worker.getProxy()),this._client},WorkerManager.prototype.getLanguageServiceWorker=function(){for(var _client,_this=this,resources=[],_i=0;_i<arguments.length;_i++)resources[_i]=arguments[_i];return toShallowCancelPromise(this._getClient().then((function(client){_client=client})).then((function(_){return _this._worker.withSyncedResources(resources)})).then((function(_){return _client})))},WorkerManager}();function toShallowCancelPromise(p){var completeCallback,errorCallback,r=new Promise((function(c,e){completeCallback=c,errorCallback=e}),(function(){}));return p.then(completeCallback,errorCallback),r}!function(Position){Position.create=function create(line,character){return{line:line,character:character}},Position.is=function is(value){var candidate=value;return Is.defined(candidate)&&Is.number(candidate.line)&&Is.number(candidate.character)}}(Position||(Position={})),function(Range){Range.create=function create(one,two,three,four){if(Is.number(one)&&Is.number(two)&&Is.number(three)&&Is.number(four))return{start:Position.create(one,two),end:Position.create(three,four)};if(Position.is(one)&&Position.is(two))return{start:one,end:two};throw new Error("Range#create called with invalid arguments["+one+", "+two+", "+three+", "+four+"]")},Range.is=function is(value){var candidate=value;return Is.defined(candidate)&&Position.is(candidate.start)&&Position.is(candidate.end)}}(Range||(Range={})),function(Location){Location.create=function create(uri,range){return{uri:uri,range:range}},Location.is=function is(value){var candidate=value;return Is.defined(candidate)&&Range.is(candidate.range)&&(Is.string(candidate.uri)||Is.undefined(candidate.uri))}}(Location||(Location={})),function(DiagnosticSeverity){DiagnosticSeverity.Error=1,DiagnosticSeverity.Warning=2,DiagnosticSeverity.Information=3,DiagnosticSeverity.Hint=4}(DiagnosticSeverity||(DiagnosticSeverity={})),function(Diagnostic){Diagnostic.create=function create(range,message,severity,code,source){var result={range:range,message:message};return Is.defined(severity)&&(result.severity=severity),Is.defined(code)&&(result.code=code),Is.defined(source)&&(result.source=source),result},Diagnostic.is=function is(value){var candidate=value;return Is.defined(candidate)&&Range.is(candidate.range)&&Is.string(candidate.message)&&(Is.number(candidate.severity)||Is.undefined(candidate.severity))&&(Is.number(candidate.code)||Is.string(candidate.code)||Is.undefined(candidate.code))&&(Is.string(candidate.source)||Is.undefined(candidate.source))}}(Diagnostic||(Diagnostic={})),function(Command){Command.create=function create(title,command){for(var args=[],_i=2;_i<arguments.length;_i++)args[_i-2]=arguments[_i];var result={title:title,command:command};return Is.defined(args)&&args.length>0&&(result.arguments=args),result},Command.is=function is(value){var candidate=value;return Is.defined(candidate)&&Is.string(candidate.title)&&Is.string(candidate.title)}}(Command||(Command={})),function(TextEdit){TextEdit.replace=function replace(range,newText){return{range:range,newText:newText}},TextEdit.insert=function insert(position,newText){return{range:{start:position,end:position},newText:newText}},TextEdit.del=function del(range){return{range:range,newText:""}}}(TextEdit||(TextEdit={})),function(TextDocumentEdit){TextDocumentEdit.create=function create(textDocument,edits){return{textDocument:textDocument,edits:edits}},TextDocumentEdit.is=function is(value){var candidate=value;return Is.defined(candidate)&&VersionedTextDocumentIdentifier.is(candidate.textDocument)&&Array.isArray(candidate.edits)}}(TextDocumentEdit||(TextDocumentEdit={}));var TextDocumentIdentifier,VersionedTextDocumentIdentifier,TextDocumentItem,MarkupKind,CompletionItemKind,InsertTextFormat,CompletionItem,CompletionList,MarkedString,ParameterInformation,SignatureInformation,DocumentHighlightKind,DocumentHighlight,SymbolKind,SymbolInformation,CodeActionContext,CodeLens,FormattingOptions,TextEditChangeImpl=function(){function TextEditChangeImpl(edits){this.edits=edits}return TextEditChangeImpl.prototype.insert=function(position,newText){this.edits.push(TextEdit.insert(position,newText))},TextEditChangeImpl.prototype.replace=function(range,newText){this.edits.push(TextEdit.replace(range,newText))},TextEditChangeImpl.prototype.delete=function(range){this.edits.push(TextEdit.del(range))},TextEditChangeImpl.prototype.add=function(edit){this.edits.push(edit)},TextEditChangeImpl.prototype.all=function(){return this.edits},TextEditChangeImpl.prototype.clear=function(){this.edits.splice(0,this.edits.length)},TextEditChangeImpl}();!function(){function WorkspaceChange(workspaceEdit){var _this=this;this._textEditChanges=Object.create(null),workspaceEdit&&(this._workspaceEdit=workspaceEdit,workspaceEdit.documentChanges?workspaceEdit.documentChanges.forEach((function(textDocumentEdit){var textEditChange=new TextEditChangeImpl(textDocumentEdit.edits);_this._textEditChanges[textDocumentEdit.textDocument.uri]=textEditChange})):workspaceEdit.changes&&Object.keys(workspaceEdit.changes).forEach((function(key){var textEditChange=new TextEditChangeImpl(workspaceEdit.changes[key]);_this._textEditChanges[key]=textEditChange})))}Object.defineProperty(WorkspaceChange.prototype,"edit",{get:function(){return this._workspaceEdit},enumerable:!0,configurable:!0}),WorkspaceChange.prototype.getTextEditChange=function(key){if(VersionedTextDocumentIdentifier.is(key)){if(this._workspaceEdit||(this._workspaceEdit={documentChanges:[]}),!this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for versioned document changes.");var textDocument=key;if(!(result=this._textEditChanges[textDocument.uri])){var textDocumentEdit={textDocument:textDocument,edits:edits=[]};this._workspaceEdit.documentChanges.push(textDocumentEdit),result=new TextEditChangeImpl(edits),this._textEditChanges[textDocument.uri]=result}return result}if(this._workspaceEdit||(this._workspaceEdit={changes:Object.create(null)}),!this._workspaceEdit.changes)throw new Error("Workspace edit is not configured for normal text edit changes.");var result;if(!(result=this._textEditChanges[key])){var edits=[];this._workspaceEdit.changes[key]=edits,result=new TextEditChangeImpl(edits),this._textEditChanges[key]=result}return result}}();!function(TextDocumentIdentifier){TextDocumentIdentifier.create=function create(uri){return{uri:uri}},TextDocumentIdentifier.is=function is(value){var candidate=value;return Is.defined(candidate)&&Is.string(candidate.uri)}}(TextDocumentIdentifier||(TextDocumentIdentifier={})),function(VersionedTextDocumentIdentifier){VersionedTextDocumentIdentifier.create=function create(uri,version){return{uri:uri,version:version}},VersionedTextDocumentIdentifier.is=function is(value){var candidate=value;return Is.defined(candidate)&&Is.string(candidate.uri)&&Is.number(candidate.version)}}(VersionedTextDocumentIdentifier||(VersionedTextDocumentIdentifier={})),function(TextDocumentItem){TextDocumentItem.create=function create(uri,languageId,version,text){return{uri:uri,languageId:languageId,version:version,text:text}},TextDocumentItem.is=function is(value){var candidate=value;return Is.defined(candidate)&&Is.string(candidate.uri)&&Is.string(candidate.languageId)&&Is.number(candidate.version)&&Is.string(candidate.text)}}(TextDocumentItem||(TextDocumentItem={})),function(MarkupKind){MarkupKind.PlainText="plaintext",MarkupKind.Markdown="markdown"}(MarkupKind||(MarkupKind={})),function(CompletionItemKind){CompletionItemKind.Text=1,CompletionItemKind.Method=2,CompletionItemKind.Function=3,CompletionItemKind.Constructor=4,CompletionItemKind.Field=5,CompletionItemKind.Variable=6,CompletionItemKind.Class=7,CompletionItemKind.Interface=8,CompletionItemKind.Module=9,CompletionItemKind.Property=10,CompletionItemKind.Unit=11,CompletionItemKind.Value=12,CompletionItemKind.Enum=13,CompletionItemKind.Keyword=14,CompletionItemKind.Snippet=15,CompletionItemKind.Color=16,CompletionItemKind.File=17,CompletionItemKind.Reference=18,CompletionItemKind.Folder=19,CompletionItemKind.EnumMember=20,CompletionItemKind.Constant=21,CompletionItemKind.Struct=22,CompletionItemKind.Event=23,CompletionItemKind.Operator=24,CompletionItemKind.TypeParameter=25}(CompletionItemKind||(CompletionItemKind={})),function(InsertTextFormat){InsertTextFormat.PlainText=1,InsertTextFormat.Snippet=2}(InsertTextFormat||(InsertTextFormat={})),function(CompletionItem){CompletionItem.create=function create(label){return{label:label}}}(CompletionItem||(CompletionItem={})),function(CompletionList){CompletionList.create=function create(items,isIncomplete){return{items:items||[],isIncomplete:!!isIncomplete}}}(CompletionList||(CompletionList={})),function(MarkedString){MarkedString.fromPlainText=function fromPlainText(plainText){return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}}(MarkedString||(MarkedString={})),function(ParameterInformation){ParameterInformation.create=function create(label,documentation){return documentation?{label:label,documentation:documentation}:{label:label}}}(ParameterInformation||(ParameterInformation={})),function(SignatureInformation){SignatureInformation.create=function create(label,documentation){for(var parameters=[],_i=2;_i<arguments.length;_i++)parameters[_i-2]=arguments[_i];var result={label:label};return Is.defined(documentation)&&(result.documentation=documentation),Is.defined(parameters)?result.parameters=parameters:result.parameters=[],result}}(SignatureInformation||(SignatureInformation={})),function(DocumentHighlightKind){DocumentHighlightKind.Text=1,DocumentHighlightKind.Read=2,DocumentHighlightKind.Write=3}(DocumentHighlightKind||(DocumentHighlightKind={})),function(DocumentHighlight){DocumentHighlight.create=function create(range,kind){var result={range:range};return Is.number(kind)&&(result.kind=kind),result}}(DocumentHighlight||(DocumentHighlight={})),function(SymbolKind){SymbolKind.File=1,SymbolKind.Module=2,SymbolKind.Namespace=3,SymbolKind.Package=4,SymbolKind.Class=5,SymbolKind.Method=6,SymbolKind.Property=7,SymbolKind.Field=8,SymbolKind.Constructor=9,SymbolKind.Enum=10,SymbolKind.Interface=11,SymbolKind.Function=12,SymbolKind.Variable=13,SymbolKind.Constant=14,SymbolKind.String=15,SymbolKind.Number=16,SymbolKind.Boolean=17,SymbolKind.Array=18,SymbolKind.Object=19,SymbolKind.Key=20,SymbolKind.Null=21,SymbolKind.EnumMember=22,SymbolKind.Struct=23,SymbolKind.Event=24,SymbolKind.Operator=25,SymbolKind.TypeParameter=26}(SymbolKind||(SymbolKind={})),function(SymbolInformation){SymbolInformation.create=function create(name,kind,range,uri,containerName){var result={name:name,kind:kind,location:{uri:uri,range:range}};return containerName&&(result.containerName=containerName),result}}(SymbolInformation||(SymbolInformation={})),function(CodeActionContext){CodeActionContext.create=function create(diagnostics){return{diagnostics:diagnostics}},CodeActionContext.is=function is(value){var candidate=value;return Is.defined(candidate)&&Is.typedArray(candidate.diagnostics,Diagnostic.is)}}(CodeActionContext||(CodeActionContext={})),function(CodeLens){CodeLens.create=function create(range,data){var result={range:range};return Is.defined(data)&&(result.data=data),result},CodeLens.is=function is(value){var candidate=value;return Is.defined(candidate)&&Range.is(candidate.range)&&(Is.undefined(candidate.command)||Command.is(candidate.command))}}(CodeLens||(CodeLens={})),function(FormattingOptions){FormattingOptions.create=function create(tabSize,insertSpaces){return{tabSize:tabSize,insertSpaces:insertSpaces}},FormattingOptions.is=function is(value){var candidate=value;return Is.defined(candidate)&&Is.number(candidate.tabSize)&&Is.boolean(candidate.insertSpaces)}}(FormattingOptions||(FormattingOptions={}));var DocumentLink=function DocumentLink(){};!function(DocumentLink){DocumentLink.create=function create(range,target){return{range:range,target:target}},DocumentLink.is=function is(value){var candidate=value;return Is.defined(candidate)&&Range.is(candidate.range)&&(Is.undefined(candidate.target)||Is.string(candidate.target))}}(DocumentLink||(DocumentLink={}));var TextDocument,TextDocumentSaveReason;!function(TextDocument){TextDocument.create=function create(uri,languageId,version,content){return new FullTextDocument(uri,languageId,version,content)},TextDocument.is=function is(value){var candidate=value;return!!(Is.defined(candidate)&&Is.string(candidate.uri)&&(Is.undefined(candidate.languageId)||Is.string(candidate.languageId))&&Is.number(candidate.lineCount)&&Is.func(candidate.getText)&&Is.func(candidate.positionAt)&&Is.func(candidate.offsetAt))},TextDocument.applyEdits=function applyEdits(document,edits){for(var text=document.getText(),sortedEdits=function mergeSort(data,compare){if(data.length<=1)return data;var p=data.length/2|0,left=data.slice(0,p),right=data.slice(p);mergeSort(left,compare),mergeSort(right,compare);var leftIdx=0,rightIdx=0,i=0;for(;leftIdx<left.length&&rightIdx<right.length;){var ret=compare(left[leftIdx],right[rightIdx]);data[i++]=ret<=0?left[leftIdx++]:right[rightIdx++]}for(;leftIdx<left.length;)data[i++]=left[leftIdx++];for(;rightIdx<right.length;)data[i++]=right[rightIdx++];return data}(edits,(function(a,b){return 0===a.range.start.line-b.range.start.line?a.range.start.character-b.range.start.character:0})),lastModifiedOffset=text.length,i=sortedEdits.length-1;i>=0;i--){var e=sortedEdits[i],startOffset=document.offsetAt(e.range.start),endOffset=document.offsetAt(e.range.end);if(!(endOffset<=lastModifiedOffset))throw new Error("Ovelapping edit");text=text.substring(0,startOffset)+e.newText+text.substring(endOffset,text.length),lastModifiedOffset=startOffset}return text}}(TextDocument||(TextDocument={})),function(TextDocumentSaveReason){TextDocumentSaveReason.Manual=1,TextDocumentSaveReason.AfterDelay=2,TextDocumentSaveReason.FocusOut=3}(TextDocumentSaveReason||(TextDocumentSaveReason={}));var Is,FullTextDocument=function(){function FullTextDocument(uri,languageId,version,content){this._uri=uri,this._languageId=languageId,this._version=version,this._content=content,this._lineOffsets=null}return Object.defineProperty(FullTextDocument.prototype,"uri",{get:function(){return this._uri},enumerable:!0,configurable:!0}),Object.defineProperty(FullTextDocument.prototype,"languageId",{get:function(){return this._languageId},enumerable:!0,configurable:!0}),Object.defineProperty(FullTextDocument.prototype,"version",{get:function(){return this._version},enumerable:!0,configurable:!0}),FullTextDocument.prototype.getText=function(range){if(range){var start=this.offsetAt(range.start),end=this.offsetAt(range.end);return this._content.substring(start,end)}return this._content},FullTextDocument.prototype.update=function(event,version){this._content=event.text,this._version=version,this._lineOffsets=null},FullTextDocument.prototype.getLineOffsets=function(){if(null===this._lineOffsets){for(var lineOffsets=[],text=this._content,isLineStart=!0,i=0;i<text.length;i++){isLineStart&&(lineOffsets.push(i),isLineStart=!1);var ch=text.charAt(i);isLineStart="\r"===ch||"\n"===ch,"\r"===ch&&i+1<text.length&&"\n"===text.charAt(i+1)&&i++}isLineStart&&text.length>0&&lineOffsets.push(text.length),this._lineOffsets=lineOffsets}return this._lineOffsets},FullTextDocument.prototype.positionAt=function(offset){offset=Math.max(Math.min(offset,this._content.length),0);var lineOffsets=this.getLineOffsets(),low=0,high=lineOffsets.length;if(0===high)return Position.create(0,offset);for(;low<high;){var mid=Math.floor((low+high)/2);lineOffsets[mid]>offset?high=mid:low=mid+1}var line=low-1;return Position.create(line,offset-lineOffsets[line])},FullTextDocument.prototype.offsetAt=function(position){var lineOffsets=this.getLineOffsets();if(position.line>=lineOffsets.length)return this._content.length;if(position.line<0)return 0;var lineOffset=lineOffsets[position.line],nextLineOffset=position.line+1<lineOffsets.length?lineOffsets[position.line+1]:this._content.length;return Math.max(Math.min(lineOffset+position.character,nextLineOffset),lineOffset)},Object.defineProperty(FullTextDocument.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!0,configurable:!0}),FullTextDocument}();!function(Is){var toString=Object.prototype.toString;Is.defined=function defined(value){return void 0!==value},Is.undefined=function undefined(value){return void 0===value},Is.boolean=function boolean(value){return!0===value||!1===value},Is.string=function string(value){return"[object String]"===toString.call(value)},Is.number=function number(value){return"[object Number]"===toString.call(value)},Is.func=function func(value){return"[object Function]"===toString.call(value)},Is.typedArray=function typedArray(value,check){return Array.isArray(value)&&value.every(check)}}(Is||(Is={}));var Uri=monaco.Uri,languageFeatures_Range=monaco.Range,DiagnosticsAdapter=function(){function DiagnosticsAdapter(_languageId,_worker,defaults){var _this=this;this._languageId=_languageId,this._worker=_worker,this._disposables=[],this._listener=Object.create(null);var onModelAdd=function(model){var handle,modeId=model.getModeId();modeId===_this._languageId&&(_this._listener[model.uri.toString()]=model.onDidChangeContent((function(){clearTimeout(handle),handle=setTimeout((function(){return _this._doValidate(model.uri,modeId)}),500)})),_this._doValidate(model.uri,modeId))},onModelRemoved=function(model){monaco.editor.setModelMarkers(model,_this._languageId,[]);var uriStr=model.uri.toString(),listener=_this._listener[uriStr];listener&&(listener.dispose(),delete _this._listener[uriStr])};this._disposables.push(monaco.editor.onDidCreateModel(onModelAdd)),this._disposables.push(monaco.editor.onWillDisposeModel((function(model){onModelRemoved(model),_this._resetSchema(model.uri)}))),this._disposables.push(monaco.editor.onDidChangeModelLanguage((function(event){onModelRemoved(event.model),onModelAdd(event.model),_this._resetSchema(event.model.uri)}))),this._disposables.push(defaults.onDidChange((function(_){monaco.editor.getModels().forEach((function(model){model.getModeId()===_this._languageId&&(onModelRemoved(model),onModelAdd(model))}))}))),this._disposables.push({dispose:function(){for(var key in monaco.editor.getModels().forEach(onModelRemoved),_this._listener)_this._listener[key].dispose()}}),monaco.editor.getModels().forEach(onModelAdd)}return DiagnosticsAdapter.prototype.dispose=function(){this._disposables.forEach((function(d){return d&&d.dispose()})),this._disposables=[]},DiagnosticsAdapter.prototype._resetSchema=function(resource){this._worker().then((function(worker){worker.resetSchema(resource.toString())}))},DiagnosticsAdapter.prototype._doValidate=function(resource,languageId){this._worker(resource).then((function(worker){return worker.doValidation(resource.toString()).then((function(diagnostics){var markers=diagnostics.map((function(d){return function toDiagnostics(resource,diag){var code="number"==typeof diag.code?String(diag.code):diag.code;return{severity:toSeverity(diag.severity),startLineNumber:diag.range.start.line+1,startColumn:diag.range.start.character+1,endLineNumber:diag.range.end.line+1,endColumn:diag.range.end.character+1,message:diag.message,code:code,source:diag.source}}(0,d)})),model=monaco.editor.getModel(resource);model.getModeId()===languageId&&monaco.editor.setModelMarkers(model,languageId,markers)}))})).then(void 0,(function(err){console.error(err)}))},DiagnosticsAdapter}();function toSeverity(lsSeverity){switch(lsSeverity){case DiagnosticSeverity.Error:return monaco.MarkerSeverity.Error;case DiagnosticSeverity.Warning:return monaco.MarkerSeverity.Warning;case DiagnosticSeverity.Information:return monaco.MarkerSeverity.Info;case DiagnosticSeverity.Hint:return monaco.MarkerSeverity.Hint;default:return monaco.MarkerSeverity.Info}}function fromPosition(position){if(position)return{character:position.column-1,line:position.lineNumber-1}}function fromRange(range){if(range)return{start:{line:range.startLineNumber-1,character:range.startColumn-1},end:{line:range.endLineNumber-1,character:range.endColumn-1}}}function toRange(range){if(range)return new languageFeatures_Range(range.start.line+1,range.start.character+1,range.end.line+1,range.end.character+1)}function toCompletionItemKind(kind){var mItemKind=monaco.languages.CompletionItemKind;switch(kind){case CompletionItemKind.Text:return mItemKind.Text;case CompletionItemKind.Method:return mItemKind.Method;case CompletionItemKind.Function:return mItemKind.Function;case CompletionItemKind.Constructor:return mItemKind.Constructor;case CompletionItemKind.Field:return mItemKind.Field;case CompletionItemKind.Variable:return mItemKind.Variable;case CompletionItemKind.Class:return mItemKind.Class;case CompletionItemKind.Interface:return mItemKind.Interface;case CompletionItemKind.Module:return mItemKind.Module;case CompletionItemKind.Property:return mItemKind.Property;case CompletionItemKind.Unit:return mItemKind.Unit;case CompletionItemKind.Value:return mItemKind.Value;case CompletionItemKind.Enum:return mItemKind.Enum;case CompletionItemKind.Keyword:return mItemKind.Keyword;case CompletionItemKind.Snippet:return mItemKind.Snippet;case CompletionItemKind.Color:return mItemKind.Color;case CompletionItemKind.File:return mItemKind.File;case CompletionItemKind.Reference:return mItemKind.Reference}return mItemKind.Property}function toTextEdit(textEdit){if(textEdit)return{range:toRange(textEdit.range),text:textEdit.newText}}var languageFeatures_CompletionAdapter=function(){function CompletionAdapter(_worker){this._worker=_worker}return Object.defineProperty(CompletionAdapter.prototype,"triggerCharacters",{get:function(){return[" ",":"]},enumerable:!0,configurable:!0}),CompletionAdapter.prototype.provideCompletionItems=function(model,position,token){model.getWordUntilPosition(position);var resource=model.uri;return wireCancellationToken(token,this._worker(resource).then((function(worker){return worker.doComplete(resource.toString(),fromPosition(position))})).then((function(info){if(info){var items=info.items.map((function(entry){var item={label:entry.label,insertText:entry.insertText,sortText:entry.sortText,filterText:entry.filterText,documentation:entry.documentation,detail:entry.detail,kind:toCompletionItemKind(entry.kind)};return entry.textEdit&&(item.range=toRange(entry.textEdit.range),item.insertText=entry.textEdit.newText),entry.insertTextFormat===InsertTextFormat.Snippet&&(item.insertText={value:item.insertText}),item}));return{isIncomplete:info.isIncomplete,items:items}}})))},CompletionAdapter}();function toMarkdownString(entry){return"string"==typeof entry?{value:entry}:function isMarkupContent(thing){return thing&&"object"==typeof thing&&"string"==typeof thing.kind}(entry)?"plaintext"===entry.kind?{value:entry.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:entry.value}:{value:"```"+entry.language+"\n"+entry.value+"\n```\n"}}function toMarkedStringArray(contents){if(contents)return Array.isArray(contents)?contents.map(toMarkdownString):[toMarkdownString(contents)]}var HoverAdapter=function(){function HoverAdapter(_worker){this._worker=_worker}return HoverAdapter.prototype.provideHover=function(model,position,token){var resource=model.uri;return wireCancellationToken(token,this._worker(resource).then((function(worker){return worker.doHover(resource.toString(),fromPosition(position))})).then((function(info){if(info)return{range:toRange(info.range),contents:toMarkedStringArray(info.contents)}})))},HoverAdapter}();function toSymbolKind(kind){var mKind=monaco.languages.SymbolKind;switch(kind){case SymbolKind.File:return mKind.Array;case SymbolKind.Module:return mKind.Module;case SymbolKind.Namespace:return mKind.Namespace;case SymbolKind.Package:return mKind.Package;case SymbolKind.Class:return mKind.Class;case SymbolKind.Method:return mKind.Method;case SymbolKind.Property:return mKind.Property;case SymbolKind.Field:return mKind.Field;case SymbolKind.Constructor:return mKind.Constructor;case SymbolKind.Enum:return mKind.Enum;case SymbolKind.Interface:return mKind.Interface;case SymbolKind.Function:return mKind.Function;case SymbolKind.Variable:return mKind.Variable;case SymbolKind.Constant:return mKind.Constant;case SymbolKind.String:return mKind.String;case SymbolKind.Number:return mKind.Number;case SymbolKind.Boolean:return mKind.Boolean;case SymbolKind.Array:return mKind.Array}return mKind.Function}var DocumentSymbolAdapter=function(){function DocumentSymbolAdapter(_worker){this._worker=_worker}return DocumentSymbolAdapter.prototype.provideDocumentSymbols=function(model,token){var resource=model.uri;return wireCancellationToken(token,this._worker(resource).then((function(worker){return worker.findDocumentSymbols(resource.toString())})).then((function(items){if(items)return items.map((function(item){return{name:item.name,containerName:item.containerName,kind:toSymbolKind(item.kind),location:(location=item.location,{uri:Uri.parse(location.uri),range:toRange(location.range)})};var location}))})))},DocumentSymbolAdapter}();function fromFormattingOptions(options){return{tabSize:options.tabSize,insertSpaces:options.insertSpaces}}var DocumentFormattingEditProvider=function(){function DocumentFormattingEditProvider(_worker){this._worker=_worker}return DocumentFormattingEditProvider.prototype.provideDocumentFormattingEdits=function(model,options,token){var resource=model.uri;return wireCancellationToken(token,this._worker(resource).then((function(worker){return worker.format(resource.toString(),null,fromFormattingOptions(options)).then((function(edits){if(edits&&0!==edits.length)return edits.map(toTextEdit)}))})))},DocumentFormattingEditProvider}(),DocumentRangeFormattingEditProvider=function(){function DocumentRangeFormattingEditProvider(_worker){this._worker=_worker}return DocumentRangeFormattingEditProvider.prototype.provideDocumentRangeFormattingEdits=function(model,range,options,token){var resource=model.uri;return wireCancellationToken(token,this._worker(resource).then((function(worker){return worker.format(resource.toString(),fromRange(range),fromFormattingOptions(options)).then((function(edits){if(edits&&0!==edits.length)return edits.map(toTextEdit)}))})))},DocumentRangeFormattingEditProvider}(),DocumentColorAdapter=function(){function DocumentColorAdapter(_worker){this._worker=_worker}return DocumentColorAdapter.prototype.provideDocumentColors=function(model,token){var resource=model.uri;return wireCancellationToken(token,this._worker(resource).then((function(worker){return worker.findDocumentColors(resource.toString())})).then((function(infos){if(infos)return infos.map((function(item){return{color:item.color,range:toRange(item.range)}}))})))},DocumentColorAdapter.prototype.provideColorPresentations=function(model,info,token){var resource=model.uri;return wireCancellationToken(token,this._worker(resource).then((function(worker){return worker.getColorPresentations(resource.toString(),info.color,fromRange(info.range))})).then((function(presentations){if(presentations)return presentations.map((function(presentation){var item={label:presentation.label};return presentation.textEdit&&(item.textEdit=toTextEdit(presentation.textEdit)),presentation.additionalTextEdits&&(item.additionalTextEdits=presentation.additionalTextEdits.map(toTextEdit)),item}))})))},DocumentColorAdapter}();function wireCancellationToken(token,promise){return promise.cancel&&token.onCancellationRequested((function(){return promise.cancel()})),promise}function createScanner(text,ignoreTrivia){void 0===ignoreTrivia&&(ignoreTrivia=!1);var pos=0,len=text.length,value="",tokenOffset=0,token=16,scanError=0;function scanHexDigits(count,exact){for(var digits=0,value=0;digits<count||!exact;){var ch=text.charCodeAt(pos);if(ch>=48&&ch<=57)value=16*value+ch-48;else if(ch>=65&&ch<=70)value=16*value+ch-65+10;else{if(!(ch>=97&&ch<=102))break;value=16*value+ch-97+10}pos++,digits++}return digits<count&&(value=-1),value}function scanNext(){if(value="",scanError=0,tokenOffset=pos,pos>=len)return tokenOffset=len,token=17;var code=text.charCodeAt(pos);if(isWhiteSpace(code)){do{pos++,value+=String.fromCharCode(code),code=text.charCodeAt(pos)}while(isWhiteSpace(code));return token=15}if(isLineBreak(code))return pos++,value+=String.fromCharCode(code),13===code&&10===text.charCodeAt(pos)&&(pos++,value+="\n"),token=14;switch(code){case 123:return pos++,token=1;case 125:return pos++,token=2;case 91:return pos++,token=3;case 93:return pos++,token=4;case 58:return pos++,token=6;case 44:return pos++,token=5;case 34:return pos++,value=function scanString(){for(var result="",start=pos;;){if(pos>=len){result+=text.substring(start,pos),scanError=2;break}var ch=text.charCodeAt(pos);if(34===ch){result+=text.substring(start,pos),pos++;break}if(92!==ch){if(ch>=0&&ch<=31){if(isLineBreak(ch)){result+=text.substring(start,pos),scanError=2;break}scanError=6}pos++}else{if(result+=text.substring(start,pos),++pos>=len){scanError=2;break}switch(ch=text.charCodeAt(pos++)){case 34:result+='"';break;case 92:result+="\\";break;case 47:result+="/";break;case 98:result+="\b";break;case 102:result+="\f";break;case 110:result+="\n";break;case 114:result+="\r";break;case 116:result+="\t";break;case 117:var ch_1=scanHexDigits(4,!0);ch_1>=0?result+=String.fromCharCode(ch_1):scanError=4;break;default:scanError=5}start=pos}}return result}(),token=10;case 47:var start=pos-1;if(47===text.charCodeAt(pos+1)){for(pos+=2;pos<len&&!isLineBreak(text.charCodeAt(pos));)pos++;return value=text.substring(start,pos),token=12}if(42===text.charCodeAt(pos+1)){pos+=2;for(var commentClosed=!1;pos<len;){if(42===text.charCodeAt(pos)&&pos+1<len&&47===text.charCodeAt(pos+1)){pos+=2,commentClosed=!0;break}pos++}return commentClosed||(pos++,scanError=1),value=text.substring(start,pos),token=13}return value+=String.fromCharCode(code),pos++,token=16;case 45:if(value+=String.fromCharCode(code),++pos===len||!isDigit(text.charCodeAt(pos)))return token=16;case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return value+=function scanNumber(){var start=pos;if(48===text.charCodeAt(pos))pos++;else for(pos++;pos<text.length&&isDigit(text.charCodeAt(pos));)pos++;if(pos<text.length&&46===text.charCodeAt(pos)){if(!(++pos<text.length&&isDigit(text.charCodeAt(pos))))return scanError=3,text.substring(start,pos);for(pos++;pos<text.length&&isDigit(text.charCodeAt(pos));)pos++}var end=pos;if(pos<text.length&&(69===text.charCodeAt(pos)||101===text.charCodeAt(pos)))if((++pos<text.length&&43===text.charCodeAt(pos)||45===text.charCodeAt(pos))&&pos++,pos<text.length&&isDigit(text.charCodeAt(pos))){for(pos++;pos<text.length&&isDigit(text.charCodeAt(pos));)pos++;end=pos}else scanError=3;return text.substring(start,end)}(),token=11;default:for(;pos<len&&isUnknownContentCharacter(code);)pos++,code=text.charCodeAt(pos);if(tokenOffset!==pos){switch(value=text.substring(tokenOffset,pos)){case"true":return token=8;case"false":return token=9;case"null":return token=7}return token=16}return value+=String.fromCharCode(code),pos++,token=16}}function isUnknownContentCharacter(code){if(isWhiteSpace(code)||isLineBreak(code))return!1;switch(code){case 125:case 93:case 123:case 91:case 34:case 58:case 44:return!1}return!0}return{setPosition:function setPosition(newPosition){pos=newPosition,value="",tokenOffset=0,token=16,scanError=0},getPosition:function(){return pos},scan:ignoreTrivia?function scanNextNonTrivia(){var result;do{result=scanNext()}while(result>=12&&result<=15);return result}:scanNext,getToken:function(){return token},getTokenValue:function(){return value},getTokenOffset:function(){return tokenOffset},getTokenLength:function(){return pos-tokenOffset},getTokenError:function(){return scanError}}}function isWhiteSpace(ch){return 32===ch||9===ch||11===ch||12===ch||160===ch||5760===ch||ch>=8192&&ch<=8203||8239===ch||8287===ch||12288===ch||65279===ch}function isLineBreak(ch){return 10===ch||13===ch||8232===ch||8233===ch}function isDigit(ch){return ch>=48&&ch<=57}var main_createScanner=createScanner;function createTokenizationSupport(supportComments){return{getInitialState:function(){return new JSONState(null,null,!1)},tokenize:function(line,state,offsetDelta,stopAtOffset){return function tokenize(comments,line,state,offsetDelta,stopAtOffset){void 0===offsetDelta&&(offsetDelta=0);var numberOfInsertedCharacters=0,adjustOffset=!1;switch(state.scanError){case 2:line='"'+line,numberOfInsertedCharacters=1;break;case 1:line="/*"+line,numberOfInsertedCharacters=2}var kind,ret,scanner=main_createScanner(line),lastWasColon=state.lastWasColon;ret={tokens:[],endState:state.clone()};for(;;){var offset=offsetDelta+scanner.getPosition(),type="";if(17===(kind=scanner.scan()))break;if(offset===offsetDelta+scanner.getPosition())throw new Error("Scanner did not advance, next 3 characters are: "+line.substr(scanner.getPosition(),3));switch(adjustOffset&&(offset-=numberOfInsertedCharacters),adjustOffset=numberOfInsertedCharacters>0,kind){case 1:case 2:type="delimiter.bracket.json",lastWasColon=!1;break;case 3:case 4:type="delimiter.array.json",lastWasColon=!1;break;case 6:type="delimiter.colon.json",lastWasColon=!0;break;case 5:type="delimiter.comma.json",lastWasColon=!1;break;case 8:case 9:case 7:type="keyword.json",lastWasColon=!1;break;case 10:type=lastWasColon?"string.value.json":"string.key.json",lastWasColon=!1;break;case 11:type="number.json",lastWasColon=!1}if(comments)switch(kind){case 12:type="comment.line.json";break;case 13:type="comment.block.json"}ret.endState=new JSONState(state.getStateData(),scanner.getTokenError(),lastWasColon),ret.tokens.push({startIndex:offset,scopes:type})}return ret}(supportComments,line,state,offsetDelta)}}}var JSONState=function(){function JSONState(state,scanError,lastWasColon){this._state=state,this.scanError=scanError,this.lastWasColon=lastWasColon}return JSONState.prototype.clone=function(){return new JSONState(this._state,this.scanError,this.lastWasColon)},JSONState.prototype.equals=function(other){return other===this||!!(other&&other instanceof JSONState)&&(this.scanError===other.scanError&&this.lastWasColon===other.lastWasColon)},JSONState.prototype.getStateData=function(){return this._state},JSONState.prototype.setStateData=function(state){this._state=state},JSONState}();function setupMode(defaults){var disposables=[],client=new WorkerManager(defaults);disposables.push(client);var worker=function(){for(var uris=[],_i=0;_i<arguments.length;_i++)uris[_i]=arguments[_i];return client.getLanguageServiceWorker.apply(client,uris)},languageId=defaults.languageId;disposables.push(monaco.languages.registerCompletionItemProvider(languageId,new languageFeatures_CompletionAdapter(worker))),disposables.push(monaco.languages.registerHoverProvider(languageId,new HoverAdapter(worker))),disposables.push(monaco.languages.registerDocumentSymbolProvider(languageId,new DocumentSymbolAdapter(worker))),disposables.push(monaco.languages.registerDocumentFormattingEditProvider(languageId,new DocumentFormattingEditProvider(worker))),disposables.push(monaco.languages.registerDocumentRangeFormattingEditProvider(languageId,new DocumentRangeFormattingEditProvider(worker))),disposables.push(new DiagnosticsAdapter(languageId,worker,defaults)),disposables.push(monaco.languages.setTokensProvider(languageId,createTokenizationSupport(!0))),disposables.push(monaco.languages.setLanguageConfiguration(languageId,richEditConfiguration)),disposables.push(monaco.languages.registerColorProvider(languageId,new DocumentColorAdapter(worker)))}var richEditConfiguration={wordPattern:/(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"]],autoClosingPairs:[{open:"{",close:"}",notIn:["string"]},{open:"[",close:"]",notIn:["string"]},{open:'"',close:'"',notIn:["string"]}]}}}]);
//# sourceMappingURL=237.8fe4553486f38830a00f.bundle.js.map
var GameBundle;(()=>{"use strict";var e={457:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Board=t.stringToPiece=void 0;var o=i(412),r=i(47);function s(e){for(var t in o.PieceTypes)if(o.PieceTypes[t]===e)return o.PieceTypes[t];return o.PieceTypes.EMPTY}t.stringToPiece=s;var p=function(){function e(e,t){void 0===t&&(t=!1),this.fen=e,this.whiteKingPosition=[-1,-1],this.blackKingPosition=[-1,-1],this.ROWS=0,this.COLUMNS=0,this.boardSetup=[],this.lastMove=[[-1,-1],[-1,-1],null,null],this.convertFen(e),this.pseudoLegal=t}return e.prototype.movePiece=function(e,t){var i=e[0],s=e[1],p=t[0],n=t[1];return!(this.boardSetup[i][s].getType()===o.PieceTypes.EMPTY||!this.pseudoLegal&&!this.coordinateInList(this.validMoves([i,s]),[p,n])||this.pseudoLegal&&!this.coordinateInList(this.pseudoLegalMoves([i,s]),[p,n])||(this.lastMove[0].toString()!=[-1,-1].toString()&&this.boardSetup[this.lastMove[0][0]][this.lastMove[0][1]].unhighlightPiece(),this.lastMove[1].toString()!=[-1,-1].toString()&&this.boardSetup[this.lastMove[1][0]][this.lastMove[1][1]].unhighlightPiece(),this.lastMove[0]=[i,s],this.lastMove[1]=[p,n],this.lastMove[2]=this.boardSetup[i][s],this.lastMove[3]=this.boardSetup[p][n],this.boardSetup[p][n]=this.boardSetup[i][s],this.boardSetup[p][n].incrementMoveCounter(),this.boardSetup[i][s]=new r.Piece,this.boardSetup[p][n].getType()===o.PieceTypes.KING&&(this.boardSetup[p][n].getSide()===o.Side.WHITE?this.whiteKingPosition=[p,n]:this.blackKingPosition=[p,n]),this.boardSetup[i][s].highlightPiece(),this.boardSetup[p][n].highlightPiece(),this.updateFen(),0))},e.prototype.undoMove=function(){var e=this.lastMove[0],t=this.lastMove[1],i=this.lastMove[2],o=this.lastMove[3];return null!==i&&null!==o&&(this.boardSetup[e[0]][e[1]]=i,this.boardSetup[t[0]][t[1]]=o,!0)},e.prototype.validMoves=function(e){for(var t=e[0],i=e[1],r=this.pseudoLegalMoves([t,i]),s=[],p=this.boardSetup[t][i].getSide(),n=p===o.Side.WHITE?this.whiteKingPosition:this.blackKingPosition,a=[t,i].toString()==n.toString(),u=0,S=r;u<S.length;u++){var h=S[u];a&&!this.kingInCheck(h,p,n,h)?s.push(h):a||this.kingInCheck(n,p,[t,i],h)||s.push(h)}return s},e.prototype.kingInCheck=function(e,t,i,o){return void 0===i&&(i=[-1,-1]),void 0===o&&(o=[-1,-1]),!!(this.checkFromDiagonals(e,t,i,o)||this.checkFromLines(e,t,i,o)||this.checkFromKnight(e,t,i,o)||this.checkFromPawn(e,t,i,o))},e.prototype.checkFromLines=function(e,t,i,o){for(var s=e[0],p=e[1],n=void 0===i?[-1,-1]:i,a=n[0],u=n[1],S=void 0===o?[-1,-1]:o,h=S[0],d=S[1],c=1;s+c<this.ROWS;c++){if((0,r.oppositeSide)(t,this.boardSetup[s+c][p].getSide())&&(0,r.isQueenOrRook)(this.boardSetup[s+c][p]))return!0;if((s+c!==a||p!==u)&&(s+c===h&&p===d||(0,r.sameSide)(t,this.boardSetup[s+c][p].getSide())))break}for(c=1;s-c>=0;c++){if((0,r.oppositeSide)(t,this.boardSetup[s-c][p].getSide())&&(0,r.isQueenOrRook)(this.boardSetup[s-c][p]))return!0;if((s-c!==a||p!==u)&&(s-c===h&&p===d||(0,r.sameSide)(t,this.boardSetup[s-c][p].getSide())))break}for(c=1;p+c<this.COLUMNS;c++){if((0,r.oppositeSide)(t,this.boardSetup[s][p+c].getSide())&&(0,r.isQueenOrRook)(this.boardSetup[s][p+c]))return!0;if((s!==a||p+c!==u)&&(s===h&&p+c===d||(0,r.sameSide)(t,this.boardSetup[s][p+c].getSide())))break}for(c=1;p-c>=0;c++){if((0,r.oppositeSide)(t,this.boardSetup[s][p-c].getSide())&&(0,r.isQueenOrRook)(this.boardSetup[s][p-c]))return!0;if((s!==a||p-c!==u)&&(s===h&&p-c===d||(0,r.sameSide)(t,this.boardSetup[s][p-c].getSide())))break}return!1},e.prototype.checkFromDiagonals=function(e,t,i,o){for(var s=e[0],p=e[1],n=void 0===i?[-1,-1]:i,a=n[0],u=n[1],S=void 0===o?[-1,-1]:o,h=S[0],d=S[1],c=1;s+c<this.ROWS&&p+c<this.COLUMNS;c++){if((0,r.oppositeSide)(t,this.boardSetup[s+c][p+c].getSide())&&(0,r.isQueenOrBishop)(this.boardSetup[s+c][p+c]))return!0;if((s+c!==a||p+c!==u)&&(s+c===h&&p+c===d||(0,r.sameSide)(t,this.boardSetup[s+c][p+c].getSide())))break}for(c=1;s-c>=0&&p-c>=0;c++){if((0,r.oppositeSide)(t,this.boardSetup[s-c][p-c].getSide())&&(0,r.isQueenOrBishop)(this.boardSetup[s-c][p-c]))return!0;if((s-c!==a||p-c!==u)&&(s-c===h&&p-c===d||(0,r.sameSide)(t,this.boardSetup[s-c][p-c].getSide())))break}for(c=1;s+c<this.ROWS&&p-c>=0;c++){if((0,r.oppositeSide)(t,this.boardSetup[s+c][p-c].getSide())&&(0,r.isQueenOrBishop)(this.boardSetup[s+c][p-c]))return!0;if((s+c!==a||p-c!==u)&&(s+c===h&&p-c===d||(0,r.sameSide)(t,this.boardSetup[s+c][p-c].getSide())))break}for(c=1;s-c>=0&&p+c<this.COLUMNS;c++){if((0,r.oppositeSide)(t,this.boardSetup[s-c][p+c].getSide())&&(0,r.isQueenOrBishop)(this.boardSetup[s-c][p+c]))return!0;if((s-c!==a||p+c!==u)&&(s-c===h&&p+c===d||(0,r.sameSide)(t,this.boardSetup[s-c][p+c].getSide())))break}return!1},e.prototype.checkFromKnight=function(e,t,i,o){var s=e[0],p=e[1],n=void 0===i?[-1,-1]:i,a=(n[0],n[1],void 0===o?[-1,-1]:o),u=a[0],S=a[1],h=s-2>=0,d=s-1>=0,c=s+2<this.ROWS,g=s+1<this.ROWS,b=p-2>=0,P=p-1>=0,T=p+2<this.COLUMNS,f=p+1<this.COLUMNS;return!!(h&&P&&(0,r.oppositePiece)(this.boardSetup[s][p],this.boardSetup[s-2][p-1])&&(0,r.isKnight)(this.boardSetup[s-2][p-1])&&[u,S].toString()!=[s-2,p-1].toString()||h&&f&&(0,r.oppositePiece)(this.boardSetup[s][p],this.boardSetup[s-2][p+1])&&(0,r.isKnight)(this.boardSetup[s-2][p+1])&&[u,S].toString()!=[s-2,p+1].toString()||d&&T&&(0,r.oppositePiece)(this.boardSetup[s][p],this.boardSetup[s-1][p+2])&&(0,r.isKnight)(this.boardSetup[s-1][p+2])&&[u,S].toString()!=[s-1,p+2].toString()||g&&T&&(0,r.oppositePiece)(this.boardSetup[s][p],this.boardSetup[s+1][p+2])&&(0,r.isKnight)(this.boardSetup[s+1][p+2])&&[u,S].toString()!=[s+1,p+2].toString()||c&&f&&(0,r.oppositePiece)(this.boardSetup[s][p],this.boardSetup[s+2][p+1])&&(0,r.isKnight)(this.boardSetup[s+2][p+1])&&[u,S].toString()!=[s+2,p+1].toString()||c&&P&&(0,r.oppositePiece)(this.boardSetup[s][p],this.boardSetup[s+2][p-1])&&(0,r.isKnight)(this.boardSetup[s+2][p-1])&&[u,S].toString()!=[s+2,p-1].toString()||g&&b&&(0,r.oppositePiece)(this.boardSetup[s][p],this.boardSetup[s+1][p-2])&&(0,r.isKnight)(this.boardSetup[s+1][p-2])&&[u,S].toString()!=[s+1,p-2].toString()||d&&b&&(0,r.oppositePiece)(this.boardSetup[s][p],this.boardSetup[s-1][p-2])&&(0,r.isKnight)(this.boardSetup[s-1][p-2])&&[u,S].toString()!=[s-1,p-2].toString())},e.prototype.checkFromPawn=function(e,t,i,r){var s=e[0],p=e[1],n=void 0===i?[-1,-1]:i,a=(n[0],n[1],void 0===r?[-1,-1]:r),u=a[0],S=a[1];if(s>0&&this.boardSetup[s][p].getSide()===o.Side.WHITE){if(p+1<this.ROWS&&this.boardSetup[s-1][p+1].getType()===o.PieceTypes.PAWN&&this.boardSetup[s-1][p+1].getSide()===o.Side.BLACK&&[u,S].toString()!=[s-1,p+1].toString())return!0;if(p-1>=0&&this.boardSetup[s-1][p-1].getType()===o.PieceTypes.PAWN&&this.boardSetup[s-1][p-1].getSide()===o.Side.BLACK&&[u,S].toString()!=[s-1,p-1].toString())return!0}if(s<this.ROWS-1&&this.boardSetup[s][p].getSide()===o.Side.BLACK){if(p+1<this.ROWS&&this.boardSetup[s+1][p+1].getType()===o.PieceTypes.PAWN&&this.boardSetup[s+1][p+1].getSide()===o.Side.WHITE&&[u,S].toString()!=[s+1,p+1].toString())return!0;if(p-1>=0&&this.boardSetup[s+1][p-1].getType()===o.PieceTypes.PAWN&&this.boardSetup[s+1][p-1].getSide()===o.Side.WHITE&&[u,S].toString()!=[s+1,p-1].toString())return!0}return!1},e.prototype.coordinateInList=function(e,t){for(var i=0,o=e;i<o.length;i++)if(o[i].toString()===t.toString())return!0;return!1},e.prototype.pseudoLegalMoves=function(e){var t=e[0],i=e[1],s=[],p=this.boardSetup[t][i].getDirections(),n=this.boardSetup[t][i].getRange();for(var a in p)switch(p[a]){case o.Direction.LINE:for(var u=n[a]===o.INFINITE_RANGE?Math.max(this.ROWS,this.COLUMNS):n[a],S=1;S<=u&&t+S<this.ROWS&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t+S][i])&&(s.push([t+S,i]),!(0,r.oppositePiece)(this.boardSetup[t][i],this.boardSetup[t+S][i]));S++);for(S=1;S<=u&&t-S>=0&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t-S][i])&&(s.push([t-S,i]),!(0,r.oppositePiece)(this.boardSetup[t][i],this.boardSetup[t-S][i]));S++);for(S=1;S<=u&&i+S<this.COLUMNS&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t][i+S])&&(s.push([t,i+S]),!(0,r.oppositePiece)(this.boardSetup[t][i],this.boardSetup[t][i+S]));S++);for(S=1;S<=u&&i-S>=0&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t][i-S])&&(s.push([t,i-S]),!(0,r.oppositePiece)(this.boardSetup[t][i],this.boardSetup[t][i-S]));S++);break;case o.Direction.DIAGONAL:for(u=n[a]===o.INFINITE_RANGE?Math.max(this.ROWS,this.COLUMNS):n[a],S=1;S<=u&&t+S<this.ROWS&&i+S<this.COLUMNS&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t+S][i+S])&&(s.push([t+S,i+S]),!(0,r.oppositePiece)(this.boardSetup[t][i],this.boardSetup[t+S][i+S]));S++);for(S=1;S<=u&&t-S>=0&&i-S>=0&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t-S][i-S])&&(s.push([t-S,i-S]),!(0,r.oppositePiece)(this.boardSetup[t][i],this.boardSetup[t-S][i-S]));S++);for(S=1;S<=u&&t+S<this.ROWS&&i-S>=0&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t+S][i-S])&&(s.push([t+S,i-S]),!(0,r.oppositePiece)(this.boardSetup[t][i],this.boardSetup[t+S][i-S]));S++);for(S=1;S<=u&&t-S>=0&&i+S<this.COLUMNS&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t-S][i+S])&&(s.push([t-S,i+S]),!(0,r.oppositePiece)(this.boardSetup[t][i],this.boardSetup[t-S][i+S]));S++);break;case o.Direction.PAWN:switch(this.boardSetup[t][i].getSide()){case o.Side.WHITE:if(0===t)break;this.boardSetup[t-1][i].getType()===o.PieceTypes.EMPTY&&s.push([t-1,i]),6===t&&this.boardSetup[t-2][i].getType()===o.PieceTypes.EMPTY&&this.boardSetup[t-1][i].getType()===o.PieceTypes.EMPTY&&s.push([t-2,i]),i-1>=0&&(0,r.oppositePiece)(this.boardSetup[t][i],this.boardSetup[t-1][i-1])&&s.push([t-1,i-1]),i+1<this.COLUMNS&&(0,r.oppositePiece)(this.boardSetup[t][i],this.boardSetup[t-1][i+1])&&s.push([t-1,i+1]);break;case o.Side.BLACK:if(t==this.ROWS-1)break;this.boardSetup[t+1][i].getType()===o.PieceTypes.EMPTY&&s.push([t+1,i]),1===t&&this.boardSetup[t+2][i].getType()===o.PieceTypes.EMPTY&&this.boardSetup[t+1][i].getType()===o.PieceTypes.EMPTY&&s.push([t+2,i]),i-1>=0&&(0,r.oppositePiece)(this.boardSetup[t][i],this.boardSetup[t+1][i-1])&&s.push([t+1,i-1]),i+1<this.COLUMNS&&(0,r.oppositePiece)(this.boardSetup[t][i],this.boardSetup[t+1][i+1])&&s.push([t+1,i+1])}break;case o.Direction.L:var h=t-2>=0,d=t-1>=0,c=t+2<this.ROWS,g=t+1<this.ROWS,b=i-2>=0,P=i-1>=0,T=i+2<this.COLUMNS,f=i+1<this.COLUMNS;h&&P&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t-2][i-1])&&s.push([t-2,i-1]),h&&f&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t-2][i+1])&&s.push([t-2,i+1]),d&&T&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t-1][i+2])&&s.push([t-1,i+2]),g&&T&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t+1][i+2])&&s.push([t+1,i+2]),c&&f&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t+2][i+1])&&s.push([t+2,i+1]),c&&P&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t+2][i-1])&&s.push([t+2,i-1]),g&&b&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t+1][i-2])&&s.push([t+1,i-2]),d&&b&&!(0,r.sameSidePiece)(this.boardSetup[t][i],this.boardSetup[t-1][i-2])&&s.push([t-1,i-2])}return s},e.prototype.convertFen=function(e){var t=this;e.split("/").forEach((function(e,i){if(0==i){var p=e.split(" ");t.ROWS=Number(p[0]),t.COLUMNS=Number(p[1]),t.boardSetup=[];for(var n=0;n<t.ROWS;n++){t.boardSetup[n]=[];for(var a=0;a<t.ROWS;a++)t.boardSetup[n][a]=new r.Piece}}else for(var u=0,S=0,h=p=e.split("");S<h.length;S++){var d=h[S],c=s(d.toLowerCase());if(c!==o.PieceTypes.EMPTY){var g=d===d.toLowerCase()?o.Side.BLACK:o.Side.WHITE;switch(t.boardSetup[i-1][u]=new r.Piece(c,g,[i-1,u]),c){case o.PieceTypes.KING:t.boardSetup[i-1][u].setDirections([o.Direction.LINE,o.Direction.DIAGONAL]),t.boardSetup[i-1][u].setRange([1,1]),g===o.Side.WHITE?t.whiteKingPosition=[i-1,u]:t.blackKingPosition=[i-1,u];break;case o.PieceTypes.QUEEN:t.boardSetup[i-1][u].setDirections([o.Direction.LINE,o.Direction.DIAGONAL]),t.boardSetup[i-1][u].setRange([o.INFINITE_RANGE,o.INFINITE_RANGE]);break;case o.PieceTypes.BISHOP:t.boardSetup[i-1][u].setDirections([o.Direction.DIAGONAL]),t.boardSetup[i-1][u].setRange([o.INFINITE_RANGE]);break;case o.PieceTypes.ROOK:t.boardSetup[i-1][u].setDirections([o.Direction.LINE]),t.boardSetup[i-1][u].setRange([o.INFINITE_RANGE]);break;case o.PieceTypes.KNIGHT:t.boardSetup[i-1][u].setDirections([o.Direction.L]),t.boardSetup[i-1][u].setRange([1]);break;case o.PieceTypes.PAWN:t.boardSetup[i-1][u].setDirections([o.Direction.PAWN]),t.boardSetup[i-1][u].setRange([1])}u++}else u+=Number(d)}}))},e.prototype.updateFen=function(){var e=this,t="";this.fen.split("/").forEach((function(i,r){if(r-1!=e.lastMove[0][0]&&r-1!=e.lastMove[1][0])t+=i+"/";else{for(var s=0,p=e.boardSetup[r-1];s<p.length;s++){var n=p[s];if(n.getType()!=o.PieceTypes.EMPTY)t+=n.getSide()===o.Side.WHITE?n.getType().toUpperCase():n.getType();else if(isNaN(Number(t.slice(-1))))t+="1";else{var a=(Number(t.slice(-1))+1).toString();t=t.slice(0,-1)+a}}t+="/"}})),this.fen=t.slice(0,-1)},e.prototype.getFen=function(){return this.fen},e.prototype.getBoard=function(){return this.boardSetup},e.prototype.getRows=function(){return this.ROWS},e.prototype.getColumns=function(){return this.COLUMNS},e.prototype.getLastMove=function(){return this.lastMove},e.prototype.getWhiteKingPosition=function(){return this.whiteKingPosition},e.prototype.getBlackKingPosition=function(){return this.blackKingPosition},e.prototype.printBoard=function(){for(var e=0,t=this.boardSetup;e<t.length;e++){for(var i="",r=0,s=t[e];r<s.length;r++){var p=s[r];i+=p.getSide()===o.Side.WHITE?p.getType().toString().toUpperCase()+" ":p.getType().toString()+" "}console.log(i)}},e.prototype.printValidSquares=function(e){for(var t=e[0],i=e[1],o="",r=this.validMoves([t,i]),s=0;s<this.ROWS;s++){for(var p="",n=0;n<this.COLUMNS;n++)[s,n].toString()==[t,i].toString()?p+="@ ":p+=this.coordinateInList(r,[s,n])?"x ":". ";o+=p+"\n"}console.log(o)},e}();t.Board=p},941:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameState=void 0;var o=i(412),r=i(457),s=function(){function e(e,t,i,o,s){void 0===s&&(s=!1),this.board=new r.Board(e,s),this.currentTurn=t,this.timeWhite=i,this.timeBlack=o}return e.prototype.movePiece=function(e,t){return(this.board.getBoard()[e[0]][e[1]].getSide()==o.Side.WHITE||0!==this.currentTurn)&&(this.board.getBoard()[e[0]][e[1]].getSide()==o.Side.BLACK||1!==this.currentTurn)&&this.board.movePiece(e,t)},e}();t.GameState=s},47:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Piece=t.isKing=t.isPawn=t.isKnight=t.isQueenOrBishop=t.isQueenOrRook=t.sameSide=t.sameSidePiece=t.oppositeSide=t.oppositePiece=void 0;var o=i(412);t.oppositePiece=function(e,t){return e.getSide()===o.Side.WHITE&&t.getSide()===o.Side.BLACK||e.getSide()===o.Side.BLACK&&t.getSide()===o.Side.WHITE},t.oppositeSide=function(e,t){return e===o.Side.WHITE&&t===o.Side.BLACK||e===o.Side.BLACK&&t===o.Side.WHITE},t.sameSidePiece=function(e,t){return e.getSide()===o.Side.WHITE&&t.getSide()===o.Side.WHITE||e.getSide()===o.Side.BLACK&&t.getSide()===o.Side.BLACK},t.sameSide=function(e,t){return e===o.Side.WHITE&&t===o.Side.WHITE||e===o.Side.BLACK&&t===o.Side.BLACK},t.isQueenOrRook=function(e){return e.getType()===o.PieceTypes.QUEEN||e.getType()===o.PieceTypes.ROOK},t.isQueenOrBishop=function(e){return e.getType()===o.PieceTypes.QUEEN||e.getType()===o.PieceTypes.BISHOP},t.isKnight=function(e){return e.getType()===o.PieceTypes.KNIGHT},t.isPawn=function(e){return e.getType()===o.PieceTypes.PAWN},t.isKing=function(e){return e.getType()===o.PieceTypes.KING};var r=function(){function e(e,t,i,r,s,p,n,a){void 0===e&&(e=o.PieceTypes.EMPTY),void 0===t&&(t=o.Side.NONE),void 0===i&&(i=[-1,-1]),void 0===r&&(r=0),void 0===s&&(s=0),void 0===p&&(p=[0]),void 0===n&&(n=[]),void 0===a&&(a=[]),this.type=e,this.side=t,this.initialSquare=i,this.level=r,this.currentXP=s,this.range=p,this.directions=n,this.abilities=a,this.moveCounter=0,this.highlighted=!1}return e.prototype.setDirections=function(e){this.directions=e},e.prototype.getDirections=function(){return this.directions},e.prototype.setRange=function(e){this.range=e},e.prototype.getRange=function(){return this.range},e.prototype.setLevel=function(e){this.level=e},e.prototype.getLevel=function(){return this.level},e.prototype.setXP=function(e){this.currentXP=e},e.prototype.getXP=function(){return this.currentXP},e.prototype.setType=function(e){this.type=e},e.prototype.getType=function(){return this.type},e.prototype.setSide=function(e){this.side=e},e.prototype.getSide=function(){return this.side},e.prototype.incrementMoveCounter=function(){this.moveCounter++},e.prototype.setMoveCounter=function(e){this.moveCounter=e},e.prototype.getMoveCounter=function(){return this.moveCounter},e.prototype.highlightPiece=function(){this.highlighted=!0},e.prototype.unhighlightPiece=function(){this.highlighted=!1},e.prototype.getHighlight=function(){return this.highlighted},e.prototype.getInitialSquare=function(){return this.initialSquare},e}();t.Piece=r},412:(e,t)=>{var i,o,r,s,p;Object.defineProperty(t,"__esModule",{value:!0}),t.PieceAbilities=t.PieceTypes=t.Side=t.Direction=t.GameResult=t.INFINITE_TIME=t.INFINITE_RANGE=void 0,t.INFINITE_RANGE=-1,t.INFINITE_TIME=-1,(p=t.GameResult||(t.GameResult={}))[p.BLACK_WIN=-1]="BLACK_WIN",p[p.DRAW=0]="DRAW",p[p.WHITE_WIN=1]="WHITE_WIN",p[p.IN_PROGRESS=2]="IN_PROGRESS",(s=t.Direction||(t.Direction={})).LINE="LINE",s.DIAGONAL="DIAGONAL",s.L="L",s.PAWN="PAWN",(r=t.Side||(t.Side={})).WHITE="WHITE",r.BLACK="BLACK",r.NONE="NONE",(o=t.PieceTypes||(t.PieceTypes={})).EMPTY=".",o.PAWN="p",o.BISHOP="b",o.KNIGHT="n",o.ROOK="r",o.QUEEN="q",o.KING="k",(i=t.PieceAbilities||(t.PieceAbilities={}))[i.SHIELD=100]="SHIELD",i[i.SCOUT=200]="SCOUT",i[i.TIME_TRAVEL=300]="TIME_TRAVEL",i[i.SMOLDERING=301]="SMOLDERING",i[i.SNIPER=400]="SNIPER",i[i.CONVERT_ENEMY=401]="CONVERT_ENEMY",i[i.COLOR_COMPLEX=402]="COLOR_COMPLEX",i[i.TANK=500]="TANK",i[i.BECOME_KING=600]="BECOME_KING",i[i.SKIP=700]="SKIP",i[i.FRIENDLY_FIRE=701]="FRIENDLY_FIRE",i[i.BLITZKRIEG=702]="BLITZKRIEG",i[i.CASTLING=703]="CASTLING"}},t={};function i(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,i),s.exports}var o={};(()=>{var e=o;Object.defineProperty(e,"__esModule",{value:!0}),e.Game=void 0;var t=i(412),r=i(941);e.Game=function(){function e(i,o,s,p){void 0===p&&(p=!1),this.gameId=e.gameIdCounter,e.gameIdCounter++,this.whiteId=i,this.blackId=o,this.gameState=new r.GameState(s,0,t.INFINITE_TIME,t.INFINITE_TIME,p),this.gameResult=t.GameResult.IN_PROGRESS}return e.gameIdCounter=1e3,e}()})(),GameBundle=o})();
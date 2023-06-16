var GameBundle;(()=>{"use strict";var e={457:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Board=t.stringToPiece=void 0;var o=i(412),r=i(47);function s(e){for(var t in o.PieceTypes)if(o.PieceTypes[t]===e)return o.PieceTypes[t];return o.PieceTypes.EMPTY}t.stringToPiece=s;var a=function(){function e(e,t){void 0===t&&(t=!1),this.fen=e,this.whiteKingPosition=[-1,-1],this.blackKingPosition=[-1,-1],this.ROWS=0,this.COLUMNS=0,this.boardSetup=[],this.movesList=[],this.movesList.push([[-1,-1],[-1,-1],null,null]),this.convertFen(e),this.pseudoLegal=t,this.mustLevelUp=!1}return e.prototype.movePiece=function(e,t){var i=e[0],s=e[1],a=t[0],n=t[1];if(this.boardSetup[i][s].getType()===o.PieceTypes.EMPTY)return!1;if(!this.pseudoLegal&&!this.coordinateInList(this.validMoves([i,s]),[a,n]))return!1;if(this.pseudoLegal&&!this.coordinateInList(this.pseudoLegalMoves([i,s]),[a,n]))return!1;this.getLastMove()[0].toString()!=[-1,-1].toString()&&this.boardSetup[this.getLastMove()[0][0]][this.getLastMove()[0][1]].unhighlightPiece(),this.getLastMove()[1].toString()!=[-1,-1].toString()&&this.boardSetup[this.getLastMove()[1][0]][this.getLastMove()[1][1]].unhighlightPiece(),this.movesList.push([[i,s],[a,n],this.boardSetup[i][s],this.boardSetup[a][n]]);var p=this.boardSetup[a][n].getTotalXP();return this.boardSetup[a][n]=this.boardSetup[i][s],this.mustLevelUp=this.boardSetup[a][n].addXP(p),!0===this.mustLevelUp&&(this.mustLevelUp=[a,n]),this.checkPawnPromotion([a,n])&&(this.mustLevelUp=!1),i===a&&s===n||(this.boardSetup[i][s]=new r.Piece),this.boardSetup[a][n].getType()===o.PieceTypes.KING&&(this.boardSetup[a][n].getSide()===o.Side.WHITE?this.whiteKingPosition=[a,n]:this.blackKingPosition=[a,n]),this.boardSetup[i][s].highlightPiece(),this.boardSetup[a][n].highlightPiece(),this.updateFen(),!0},e.prototype.undoMove=function(){var e=this.movesList.pop();if(void 0===e)return!1;var t=e[0],i=e[1],o=e[2],r=e[3];return null!==o&&null!==r&&(this.boardSetup[t[0]][t[1]]=o,this.boardSetup[i[0]][i[1]]=r,!0)},e.prototype.validMoves=function(e){for(var t=e[0],i=e[1],r=this.pseudoLegalMoves([t,i]),s=[],a=this.boardSetup[t][i].getSide(),n=a===o.Side.WHITE?this.whiteKingPosition:this.blackKingPosition,p=[t,i].toString()==n.toString(),h=0,u=r;h<u.length;h++){var d=u[h];p&&!this.kingInCheck(d,a,n,d)?s.push(d):p||this.kingInCheck(n,a,[t,i],d)||s.push(d)}return s},e.prototype.sideHasLegalMoves=function(e){for(var t=0;t<this.ROWS;t++)for(var i=0;i<this.COLUMNS;i++)if(this.boardSetup[t][i].getSide()===e&&this.validMoves([t,i]).length>0)return!0;return!1},e.prototype.printAllValidMoves=function(e){for(var t=0;t<this.ROWS;t++)for(var i=0;i<this.COLUMNS;i++)this.boardSetup[t][i].getSide()===e&&this.validMoves([t,i]).length>0&&console.log([t,i],"->",this.validMoves([t,i]))},e.prototype.kingInCheck=function(e,t,i,o){return void 0===i&&(i=[-1,-1]),void 0===o&&(o=[-1,-1]),!!(this.checkFromDiagonals(e,t,i,o)||this.checkFromLines(e,t,i,o)||this.checkFromKnight(e,t,i,o)||this.checkFromPawn(e,t,i,o)||this.checkFromCamel(e,t,i,o))},e.prototype.checkFromLines=function(e,t,i,s){for(var a=e[0],n=e[1],p=void 0===i?[-1,-1]:i,h=p[0],u=p[1],d=void 0===s?[-1,-1]:s,S=d[0],c=d[1],b=1;a+b<this.ROWS;b++){if((0,r.oppositeSide)(t,this.boardSetup[a+b][n].getSide())){if(this.boardSetup[a+b][n].attackRange(o.Direction.LINE)>=b){if(a+b===S&&n===c)break;return!0}break}if((a+b!==h||n!==u)&&(a+b===S&&n===c||(0,r.sameSide)(t,this.boardSetup[a+b][n].getSide())))break}for(b=1;a-b>=0;b++){if((0,r.oppositeSide)(t,this.boardSetup[a-b][n].getSide())){if(this.boardSetup[a-b][n].attackRange(o.Direction.LINE)>=b){if(a-b===S&&n===c)break;return!0}break}if((a-b!==h||n!==u)&&(a-b===S&&n===c||(0,r.sameSide)(t,this.boardSetup[a-b][n].getSide())))break}for(b=1;n+b<this.COLUMNS;b++){if((0,r.oppositeSide)(t,this.boardSetup[a][n+b].getSide())){if(this.boardSetup[a][n+b].attackRange(o.Direction.LINE)>=b){if(a===S&&n+b===c)break;return!0}break}if((a!==h||n+b!==u)&&(a===S&&n+b===c||(0,r.sameSide)(t,this.boardSetup[a][n+b].getSide())))break}for(b=1;n-b>=0;b++){if((0,r.oppositeSide)(t,this.boardSetup[a][n-b].getSide())){if(this.boardSetup[a][n-b].attackRange(o.Direction.LINE)>=b){if(a===S&&n-b===c)break;return!0}break}if((a!==h||n-b!==u)&&(a===S&&n-b===c||(0,r.sameSide)(t,this.boardSetup[a][n-b].getSide())))break}return!1},e.prototype.checkFromDiagonals=function(e,t,i,s){for(var a=e[0],n=e[1],p=void 0===i?[-1,-1]:i,h=p[0],u=p[1],d=void 0===s?[-1,-1]:s,S=d[0],c=d[1],b=1;a+b<this.ROWS&&n+b<this.COLUMNS;b++){if((0,r.oppositeSide)(t,this.boardSetup[a+b][n+b].getSide())){if(this.boardSetup[a+b][n+b].attackRange(o.Direction.DIAGONAL)>=b){if(a+b===S&&n+b===c)break;return!0}break}if((a+b!==h||n+b!==u)&&(a+b===S&&n+b===c||(0,r.sameSide)(t,this.boardSetup[a+b][n+b].getSide())))break}for(b=1;a-b>=0&&n-b>=0;b++){if((0,r.oppositeSide)(t,this.boardSetup[a-b][n-b].getSide())){if(this.boardSetup[a-b][n-b].attackRange(o.Direction.DIAGONAL)>=b){if(a-b===S&&n-b===c)break;return!0}break}if((a-b!==h||n-b!==u)&&(a-b===S&&n-b===c||(0,r.sameSide)(t,this.boardSetup[a-b][n-b].getSide())))break}for(b=1;a+b<this.ROWS&&n-b>=0;b++){if((0,r.oppositeSide)(t,this.boardSetup[a+b][n-b].getSide())){if(this.boardSetup[a+b][n-b].attackRange(o.Direction.DIAGONAL)>=b){if(a+b===S&&n-b===c)break;return!0}break}if((a+b!==h||n-b!==u)&&(a+b===S&&n-b===c||(0,r.sameSide)(t,this.boardSetup[a+b][n-b].getSide())))break}for(b=1;a-b>=0&&n+b<this.COLUMNS;b++){if((0,r.oppositeSide)(t,this.boardSetup[a-b][n+b].getSide())){if(this.boardSetup[a-b][n+b].attackRange(o.Direction.DIAGONAL)>=b){if(a-b===S&&n+b===c)break;return!0}break}if((a-b!==h||n+b!==u)&&(a-b===S&&n+b===c||(0,r.sameSide)(t,this.boardSetup[a-b][n+b].getSide())))break}return!1},e.prototype.checkFromKnight=function(e,t,i,o){var s=e[0],a=e[1],n=void 0===i?[-1,-1]:i,p=(n[0],n[1],void 0===o?[-1,-1]:o),h=p[0],u=p[1],d=s-2>=0,S=s-1>=0,c=s+2<this.ROWS,b=s+1<this.ROWS,g=a-2>=0,P=a-1>=0,l=a+2<this.COLUMNS,f=a+1<this.COLUMNS;return!!(d&&P&&(0,r.oppositeSide)(t,this.boardSetup[s-2][a-1].getSide())&&this.boardSetup[s-2][a-1].hasKnightAttack()&&[h,u].toString()!=[s-2,a-1].toString()||d&&f&&(0,r.oppositeSide)(t,this.boardSetup[s-2][a+1].getSide())&&this.boardSetup[s-2][a+1].hasKnightAttack()&&[h,u].toString()!=[s-2,a+1].toString()||S&&l&&(0,r.oppositeSide)(t,this.boardSetup[s-1][a+2].getSide())&&this.boardSetup[s-1][a+2].hasKnightAttack()&&[h,u].toString()!=[s-1,a+2].toString()||b&&l&&(0,r.oppositeSide)(t,this.boardSetup[s+1][a+2].getSide())&&this.boardSetup[s+1][a+2].hasKnightAttack()&&[h,u].toString()!=[s+1,a+2].toString()||c&&f&&(0,r.oppositeSide)(t,this.boardSetup[s+2][a+1].getSide())&&this.boardSetup[s+2][a+1].hasKnightAttack()&&[h,u].toString()!=[s+2,a+1].toString()||c&&P&&(0,r.oppositeSide)(t,this.boardSetup[s+2][a-1].getSide())&&this.boardSetup[s+2][a-1].hasKnightAttack()&&[h,u].toString()!=[s+2,a-1].toString()||b&&g&&(0,r.oppositeSide)(t,this.boardSetup[s+1][a-2].getSide())&&this.boardSetup[s+1][a-2].hasKnightAttack()&&[h,u].toString()!=[s+1,a-2].toString()||S&&g&&(0,r.oppositeSide)(t,this.boardSetup[s-1][a-2].getSide())&&this.boardSetup[s-1][a-2].hasKnightAttack()&&[h,u].toString()!=[s-1,a-2].toString())},e.prototype.checkFromCamel=function(e,t,i,o){var s=e[0],a=e[1],n=void 0===i?[-1,-1]:i,p=(n[0],n[1],void 0===o?[-1,-1]:o),h=p[0],u=p[1],d=s-3>=0,S=s-1>=0,c=s+3<this.ROWS,b=s+1<this.ROWS,g=a-3>=0,P=a-1>=0,l=a+3<this.COLUMNS,f=a+1<this.COLUMNS;return!!(d&&P&&(0,r.oppositeSide)(t,this.boardSetup[s-3][a-1].getSide())&&this.boardSetup[s-3][a-1].hasCamelAttack()&&[h,u].toString()!=[s-3,a-1].toString()||d&&f&&(0,r.oppositeSide)(t,this.boardSetup[s-3][a+1].getSide())&&this.boardSetup[s-3][a+1].hasCamelAttack()&&[h,u].toString()!=[s-3,a+1].toString()||S&&l&&(0,r.oppositeSide)(t,this.boardSetup[s-1][a+3].getSide())&&this.boardSetup[s-1][a+3].hasCamelAttack()&&[h,u].toString()!=[s-1,a+3].toString()||b&&l&&(0,r.oppositeSide)(t,this.boardSetup[s+1][a+3].getSide())&&this.boardSetup[s+1][a+3].hasCamelAttack()&&[h,u].toString()!=[s+1,a+3].toString()||c&&f&&(0,r.oppositeSide)(t,this.boardSetup[s+3][a+1].getSide())&&this.boardSetup[s+3][a+1].hasCamelAttack()&&[h,u].toString()!=[s+3,a+1].toString()||c&&P&&(0,r.oppositeSide)(t,this.boardSetup[s+3][a-1].getSide())&&this.boardSetup[s+3][a-1].hasCamelAttack()&&[h,u].toString()!=[s+3,a-1].toString()||b&&g&&(0,r.oppositeSide)(t,this.boardSetup[s+1][a-3].getSide())&&this.boardSetup[s+1][a-3].hasCamelAttack()&&[h,u].toString()!=[s+1,a-3].toString()||S&&g&&(0,r.oppositeSide)(t,this.boardSetup[s-1][a-3].getSide())&&this.boardSetup[s-1][a-3].hasCamelAttack()&&[h,u].toString()!=[s-1,a-3].toString())},e.prototype.checkFromPawn=function(e,t,i,r){var s=e[0],a=e[1],n=void 0===i?[-1,-1]:i,p=(n[0],n[1],void 0===r?[-1,-1]:r),h=p[0],u=p[1];if(s>0&&t===o.Side.WHITE){if(a+1<this.COLUMNS&&this.boardSetup[s-1][a+1].hasPawnAttack()&&this.boardSetup[s-1][a+1].getSide()===o.Side.BLACK&&[h,u].toString()!=[s-1,a+1].toString())return!0;if(a-1>=0&&this.boardSetup[s-1][a-1].hasPawnAttack()&&this.boardSetup[s-1][a-1].getSide()===o.Side.BLACK&&[h,u].toString()!=[s-1,a-1].toString())return!0}if(s<this.ROWS-1&&t===o.Side.BLACK){if(a+1<this.COLUMNS&&this.boardSetup[s+1][a+1].hasPawnAttack()&&this.boardSetup[s+1][a+1].getSide()===o.Side.WHITE&&[h,u].toString()!=[s+1,a+1].toString())return!0;if(a-1>=0&&this.boardSetup[s+1][a-1].hasPawnAttack()&&this.boardSetup[s+1][a-1].getSide()===o.Side.WHITE&&[h,u].toString()!=[s+1,a-1].toString())return!0}return!1},e.prototype.coordinateInList=function(e,t){for(var i=0,o=e;i<o.length;i++)if(o[i].toString()===t.toString())return!0;return!1},e.prototype.pseudoLegalMoves=function(e){var t,i=e[0],s=e[1],a=[];if(this.boardSetup[i][s].getType()===o.PieceTypes.QUEEN&&null!==this.getLastMove()[2]&&-1!=(null===(t=this.getLastMove()[2])||void 0===t?void 0:t.getAbilities().indexOf(o.PieceAbilities.SMOLDERING)))return a;for(var n=0,p=this.boardSetup[i][s].getAbilities();n<p.length;n++){var h=p[n];h!==o.PieceAbilities.SKIP?h!==o.PieceAbilities.SCOUT?h!==o.PieceAbilities.QUANTUM_TUNNELING?h!==o.PieceAbilities.ON_HORSE?h!==o.PieceAbilities.ON_CAMEL?h!==o.PieceAbilities.COLOR_COMPLEX?h!==o.PieceAbilities.HAS_PAWN?h!==o.PieceAbilities.SWEEPER?h!==o.PieceAbilities.CHANCELLOR?h!==o.PieceAbilities.ARCHBISHOP?h!==o.PieceAbilities.CAMEL||(this.boardSetup[i][s].setDirections([o.Direction.L,o.Direction.CAMEL]),this.boardSetup[i][s].setRange([1,1])):(this.boardSetup[i][s].setDirections([o.Direction.DIAGONAL,o.Direction.L]),this.boardSetup[i][s].setRange([o.INFINITE_RANGE,1])):(this.boardSetup[i][s].setDirections([o.Direction.LINE,o.Direction.L]),this.boardSetup[i][s].setRange([o.INFINITE_RANGE,1])):(this.boardSetup[i][s].setDirections([o.Direction.LINE,o.Direction.DIAGONAL,o.Direction.L]),this.boardSetup[i][s].setRange([2,2,1])):(this.boardSetup[i][s].setDirections([o.Direction.LINE,o.Direction.PAWN]),this.boardSetup[i][s].setRange([o.INFINITE_RANGE,1])):(s>0&&!(0,r.sameSidePiece)(this.boardSetup[i][s-1],this.boardSetup[i][s])&&a.push([i,s-1]),s<this.COLUMNS-1&&!(0,r.sameSidePiece)(this.boardSetup[i][s+1],this.boardSetup[i][s])&&a.push([i,s+1])):(this.boardSetup[i][s].removeAbility(o.PieceAbilities.ON_HORSE),this.boardSetup[i][s].setDirections([o.Direction.LINE,o.Direction.DIAGONAL,o.Direction.CAMEL]),this.boardSetup[i][s].setRange([1,1,1])):(this.boardSetup[i][s].removeAbility(o.PieceAbilities.ON_CAMEL),this.boardSetup[i][s].setDirections([o.Direction.LINE,o.Direction.DIAGONAL,o.Direction.L]),this.boardSetup[i][s].setRange([1,1,1])):((g=this.boardSetup[i][s].getSide())===o.Side.WHITE&&i>1&&this.boardSetup[i-1][s].getType()===o.PieceTypes.PAWN&&this.boardSetup[i-1][s].getSide()===o.Side.BLACK&&this.boardSetup[i-2][s].getType()===o.PieceTypes.EMPTY&&a.push([i-2,s]),g===o.Side.BLACK&&i<=this.ROWS-2&&this.boardSetup[i+1][s].getType()===o.PieceTypes.PAWN&&this.boardSetup[i-1][s].getSide()===o.Side.WHITE&&this.boardSetup[i+2][s].getType()===o.PieceTypes.EMPTY&&a.push([i+2,s])):((g=this.boardSetup[i][s].getSide())===o.Side.WHITE&&i>1&&this.boardSetup[i-1][s].getType()===o.PieceTypes.EMPTY&&this.boardSetup[i-2][s].getType()===o.PieceTypes.EMPTY&&a.push([i-2,s]),g===o.Side.BLACK&&i<this.ROWS-2&&this.boardSetup[i+1][s].getType()===o.PieceTypes.EMPTY&&this.boardSetup[i+2][s].getType()===o.PieceTypes.EMPTY&&a.push([i+2,s])):a.push([i,s])}var u=this.boardSetup[i][s].getDirections(),d=this.boardSetup[i][s].getRange();for(var S in u)switch(u[S]){case o.Direction.LINE:for(var c=d[S]===o.INFINITE_RANGE?Math.max(this.ROWS,this.COLUMNS):d[S],b=1;b<=c&&i+b<this.ROWS&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i+b][s])&&(a.push([i+b,s]),!(0,r.oppositePiece)(this.boardSetup[i][s],this.boardSetup[i+b][s]));b++);for(b=1;b<=c&&i-b>=0&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i-b][s])&&(a.push([i-b,s]),!(0,r.oppositePiece)(this.boardSetup[i][s],this.boardSetup[i-b][s]));b++);for(b=1;b<=c&&s+b<this.COLUMNS&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i][s+b])&&(a.push([i,s+b]),!(0,r.oppositePiece)(this.boardSetup[i][s],this.boardSetup[i][s+b]));b++);for(b=1;b<=c&&s-b>=0&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i][s-b])&&(a.push([i,s-b]),!(0,r.oppositePiece)(this.boardSetup[i][s],this.boardSetup[i][s-b]));b++);break;case o.Direction.DIAGONAL:for(c=d[S]===o.INFINITE_RANGE?Math.max(this.ROWS,this.COLUMNS):d[S],b=1;b<=c&&i+b<this.ROWS&&s+b<this.COLUMNS&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i+b][s+b])&&(a.push([i+b,s+b]),!(0,r.oppositePiece)(this.boardSetup[i][s],this.boardSetup[i+b][s+b]));b++);for(b=1;b<=c&&i-b>=0&&s-b>=0&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i-b][s-b])&&(a.push([i-b,s-b]),!(0,r.oppositePiece)(this.boardSetup[i][s],this.boardSetup[i-b][s-b]));b++);for(b=1;b<=c&&i+b<this.ROWS&&s-b>=0&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i+b][s-b])&&(a.push([i+b,s-b]),!(0,r.oppositePiece)(this.boardSetup[i][s],this.boardSetup[i+b][s-b]));b++);for(b=1;b<=c&&i-b>=0&&s+b<this.COLUMNS&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i-b][s+b])&&(a.push([i-b,s+b]),!(0,r.oppositePiece)(this.boardSetup[i][s],this.boardSetup[i-b][s+b]));b++);break;case o.Direction.PAWN:var g;switch(g=this.boardSetup[i][s].getSide()){case o.Side.WHITE:if(0===i)break;this.boardSetup[i-1][s].getType()===o.PieceTypes.EMPTY&&a.push([i-1,s]),i===this.ROWS-2&&this.boardSetup[i-2][s].getType()===o.PieceTypes.EMPTY&&this.boardSetup[i-1][s].getType()===o.PieceTypes.EMPTY&&a.push([i-2,s]),s-1>=0&&(0,r.oppositePiece)(this.boardSetup[i][s],this.boardSetup[i-1][s-1])&&a.push([i-1,s-1]),s+1<this.COLUMNS&&(0,r.oppositePiece)(this.boardSetup[i][s],this.boardSetup[i-1][s+1])&&a.push([i-1,s+1]);break;case o.Side.BLACK:if(i==this.ROWS-1)break;this.boardSetup[i+1][s].getType()===o.PieceTypes.EMPTY&&a.push([i+1,s]),1===i&&this.boardSetup[i+2][s].getType()===o.PieceTypes.EMPTY&&this.boardSetup[i+1][s].getType()===o.PieceTypes.EMPTY&&a.push([i+2,s]),s-1>=0&&(0,r.oppositePiece)(this.boardSetup[i][s],this.boardSetup[i+1][s-1])&&a.push([i+1,s-1]),s+1<this.COLUMNS&&(0,r.oppositePiece)(this.boardSetup[i][s],this.boardSetup[i+1][s+1])&&a.push([i+1,s+1])}break;case o.Direction.L:var P=i-2>=0,l=i-1>=0,f=i+2<this.ROWS,N=i+1<this.ROWS,L=s-2>=0,v=s-1>=0,E=s+2<this.COLUMNS,T=s+1<this.COLUMNS;P&&v&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i-2][s-1])&&a.push([i-2,s-1]),P&&T&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i-2][s+1])&&a.push([i-2,s+1]),l&&E&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i-1][s+2])&&a.push([i-1,s+2]),N&&E&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i+1][s+2])&&a.push([i+1,s+2]),f&&T&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i+2][s+1])&&a.push([i+2,s+1]),f&&v&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i+2][s-1])&&a.push([i+2,s-1]),N&&L&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i+1][s-2])&&a.push([i+1,s-2]),l&&L&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i-1][s-2])&&a.push([i-1,s-2]);break;case o.Direction.CAMEL:var A=i-3>=0,I=(l=i-1>=0,i+3<this.ROWS),y=(N=i+1<this.ROWS,s-3>=0),O=(v=s-1>=0,s+3<this.COLUMNS);T=s+1<this.COLUMNS,A&&v&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i-3][s-1])&&a.push([i-3,s-1]),A&&T&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i-3][s+1])&&a.push([i-3,s+1]),l&&O&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i-1][s+3])&&a.push([i-1,s+3]),N&&O&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i+1][s+3])&&a.push([i+1,s+3]),I&&T&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i+3][s+1])&&a.push([i+3,s+1]),I&&v&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i+3][s-1])&&a.push([i+3,s-1]),N&&y&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i+1][s-3])&&a.push([i+1,s-3]),l&&y&&!(0,r.sameSidePiece)(this.boardSetup[i][s],this.boardSetup[i-1][s-3])&&a.push([i-1,s-3])}return a},e.prototype.checkPawnPromotion=function(e){var t=e[0],i=e[1];if(this.boardSetup[t][i].getType()!=o.PieceTypes.PAWN)return!1;var s=this.boardSetup[t][i].getSide();return!(s===o.Side.WHITE&&0!=t||s===o.Side.BLACK&&t!=this.ROWS-1||(this.boardSetup[t][i]=new r.Piece(o.PieceTypes.QUEEN,s,[t,i],0,0,[o.INFINITE_RANGE,o.INFINITE_RANGE],[o.Direction.LINE,o.Direction.DIAGONAL],[]),0))},e.prototype.convertFen=function(e){var t=this;e.split("/").forEach((function(e,i){if(0==i){var a=e.split(" ");t.ROWS=Number(a[0]),t.COLUMNS=Number(a[1]),t.boardSetup=[];for(var n=0;n<t.ROWS;n++){t.boardSetup[n]=[];for(var p=0;p<t.COLUMNS;p++)t.boardSetup[n][p]=new r.Piece}}else{var h=0,u=0;for(n=0;n<e.length;n++){var d=s(e[n].toLowerCase());if(d!==o.PieceTypes.EMPTY){h+=u,u=0;var S=e[n]===e[n].toLowerCase()?o.Side.BLACK:o.Side.WHITE;t.boardSetup[i-1][h]=new r.Piece(d,S,[i-1,h]);var c=[];if("["===e[n+1])for(n+=2;"]"!=e[n];){var b=parseInt(e[n]+e[n+1]+e[n+2]);null!=o.PieceAbilities[b]&&c.push(b),n+=3}switch(t.boardSetup[i-1][h].setAbilities(c),d){case o.PieceTypes.KING:t.boardSetup[i-1][h].setDirections([o.Direction.LINE,o.Direction.DIAGONAL]),t.boardSetup[i-1][h].setRange([1,1]),S===o.Side.WHITE?t.whiteKingPosition=[i-1,h]:t.blackKingPosition=[i-1,h];break;case o.PieceTypes.QUEEN:t.boardSetup[i-1][h].setDirections([o.Direction.LINE,o.Direction.DIAGONAL]),t.boardSetup[i-1][h].setRange([o.INFINITE_RANGE,o.INFINITE_RANGE]);break;case o.PieceTypes.BISHOP:t.boardSetup[i-1][h].setDirections([o.Direction.DIAGONAL]),t.boardSetup[i-1][h].setRange([o.INFINITE_RANGE]);break;case o.PieceTypes.ROOK:t.boardSetup[i-1][h].setDirections([o.Direction.LINE]),t.boardSetup[i-1][h].setRange([o.INFINITE_RANGE]);break;case o.PieceTypes.KNIGHT:t.boardSetup[i-1][h].setDirections([o.Direction.L]),t.boardSetup[i-1][h].setRange([1]);break;case o.PieceTypes.PAWN:t.boardSetup[i-1][h].setDirections([o.Direction.PAWN]),t.boardSetup[i-1][h].setRange([1])}h++}else u=10*u+Number(e[n])}}}))},e.prototype.updateFen=function(){var e=this,t="";this.fen.split("/").forEach((function(i,r){if(r-1!=e.getLastMove()[0][0]&&r-1!=e.getLastMove()[1][0])t+=i+"/";else{for(var s=0,a=e.boardSetup[r-1];s<a.length;s++){var n=a[s];if(n.getType()!=o.PieceTypes.EMPTY){if(t+=n.getSide()===o.Side.WHITE?n.getType().toUpperCase():n.getType(),n.getAbilities().length>0){t+="[";for(var p=0,h=n.getAbilities();p<h.length;p++){var u=h[p];t+=u.toString()}t+="]"}}else if(isNaN(Number(t.slice(-1))))t+="1";else{var d=(Number(t.slice(-1))+1).toString();t=t.slice(0,-1)+d}}t+="/"}})),this.fen=t.slice(0,-1)},e.prototype.getFen=function(){return this.fen},e.prototype.getBoard=function(){return this.boardSetup},e.prototype.getRows=function(){return this.ROWS},e.prototype.getColumns=function(){return this.COLUMNS},e.prototype.getLastMove=function(){return this.movesList[this.movesList.length-1]},e.prototype.getWhiteKingPosition=function(){return this.whiteKingPosition},e.prototype.getBlackKingPosition=function(){return this.blackKingPosition},e.prototype.pieceMustLevelUp=function(){return this.mustLevelUp},e.prototype.levelUpDone=function(){this.mustLevelUp=!1},e.prototype.pseudoLegalGame=function(){return this.pseudoLegal},e.prototype.printBoard=function(){for(var e=0,t=this.boardSetup;e<t.length;e++){for(var i="",r=0,s=t[e];r<s.length;r++){var a=s[r];i+=a.getSide()===o.Side.WHITE?a.getType().toString().toUpperCase()+" ":a.getType().toString()+" "}console.log(i)}},e.prototype.printValidSquares=function(e){for(var t=e[0],i=e[1],o="",r=this.validMoves([t,i]),s=0;s<this.ROWS;s++){for(var a="",n=0;n<this.COLUMNS;n++)[s,n].toString()==[t,i].toString()?a+="@ ":a+=this.coordinateInList(r,[s,n])?"x ":". ";o+=a+"\n"}console.log(o)},e.prototype.printValidMoves=function(e){var t=e[0],i=e[1];console.log([t,i],"->",this.validMoves([t,i]))},e}();t.Board=a},941:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameState=void 0;var o=i(412),r=i(457),s=function(){function e(e,t,i,s,a){void 0===a&&(a=!1),this.board=new r.Board(e,a),this.currentTurn=t,this.timeWhite=i,this.timeBlack=s,this.gameResult=o.GameResult.IN_PROGRESS}return e.prototype.movePiece=function(e,t){return!(this.gameResult!=o.GameResult.IN_PROGRESS||this.board.pieceMustLevelUp()||this.board.getBoard()[e[0]][e[1]].getSide()!=o.Side.WHITE&&0===this.currentTurn||this.board.getBoard()[e[0]][e[1]].getSide()!=o.Side.BLACK&&1===this.currentTurn||!this.board.movePiece(e,t)||(this.changeTurn(),!this.board.pseudoLegalGame()&&this.stalemate()&&(this.gameResult=o.GameResult.DRAW),this.checkmate()&&(this.gameResult=0===this.currentTurn?o.GameResult.BLACK_WIN:o.GameResult.WHITE_WIN),0))},e.prototype.levelUp=function(e){var t=this.board.pieceMustLevelUp();if(!1===t)return!1;var i=t[0],r=t[1],s=this.board.getBoard()[i][r].getLevel(),a=this.board.getBoard()[i][r].getCurrentXP();return o.PieceAbilities[e]===o.PieceAbilities.NONE?(this.board.getBoard()[i][r].setXP(a-o.LEVEL_UP_XP[s]),this.board.getBoard()[i][r].setLevel(s+1),this.board.levelUpDone(),!0):-1!==this.board.getBoard()[i][r].possibleAbilities().indexOf(o.PieceAbilities[e])&&!!this.board.getBoard()[i][r].addAbility(o.PieceAbilities[e])&&(this.board.getBoard()[i][r].setXP(a-o.LEVEL_UP_XP[s]),this.board.getBoard()[i][r].setLevel(s+1),this.board.levelUpDone(),this.board.updateFen(),!0)},e.prototype.getTurn=function(){return this.currentTurn},e.prototype.takeback=function(){return!!this.board.undoMove()&&(this.changeTurn(),!0)},e.prototype.checkmate=function(){var e=this.board.getLastMove()[1];return 1===this.currentTurn&&e.toString()===this.board.getBlackKingPosition().toString()||0===this.currentTurn&&e.toString()===this.board.getWhiteKingPosition().toString()||!this.board.pseudoLegalGame()&&(!(0!==this.currentTurn||!this.board.kingInCheck(this.board.getWhiteKingPosition(),o.Side.WHITE)||this.board.sideHasLegalMoves(o.Side.WHITE))||!(1!==this.currentTurn||!this.board.kingInCheck(this.board.getBlackKingPosition(),o.Side.BLACK)||this.board.sideHasLegalMoves(o.Side.BLACK)))},e.prototype.stalemate=function(){return 0===this.currentTurn&&!this.board.sideHasLegalMoves(o.Side.WHITE)||1===this.currentTurn&&!this.board.sideHasLegalMoves(o.Side.BLACK)},e.prototype.getGameResult=function(){return this.gameResult},e.prototype.printBoard=function(){this.board.printBoard()},e.prototype.getBoard=function(){return this.board},e.prototype.changeTurn=function(){this.currentTurn=1-this.currentTurn},e}();t.GameState=s},47:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isKing=t.isPawn=t.hasLineAttack=t.isKnight=t.isQueenOrBishop=t.isQueenOrRook=t.sameSide=t.sameSidePiece=t.oppositeSide=t.oppositePiece=t.Piece=void 0;var o=i(412),r=function(){function e(e,t,i,r,s,a,n,p){void 0===e&&(e=o.PieceTypes.EMPTY),void 0===t&&(t=o.Side.NONE),void 0===i&&(i=[-1,-1]),void 0===r&&(r=0),void 0===s&&(s=0),void 0===a&&(a=[0]),void 0===n&&(n=[]),void 0===p&&(p=[]),this.type=e,this.side=t,this.initialSquare=i,this.level=r,this.currentXP=s,this.range=a,this.directions=n,this.abilities=p,this.moveCounter=0,this.highlighted=!1}return e.prototype.addXP=function(e){return this.currentXP+=o.PER_MOVE_XP,this.currentXP+=Math.floor(o.CAPTURE_MULTIPLIER*e),o.LEVEL_UP_XP[this.level]<=this.currentXP},e.prototype.addAbility=function(e){return-1==this.abilities.indexOf(e)&&(this.abilities.push(e),!0)},e.prototype.setDirections=function(e){this.directions=e},e.prototype.getDirections=function(){return this.directions},e.prototype.setAbilities=function(e){this.abilities=e},e.prototype.getAbilities=function(){return this.abilities},e.prototype.removeAbility=function(e){var t=this.abilities.indexOf(e);this.abilities.splice(t,1)},e.prototype.setRange=function(e){this.range=e},e.prototype.getRange=function(){return this.range},e.prototype.setLevel=function(e){this.level=e},e.prototype.getLevel=function(){return this.level},e.prototype.setXP=function(e){this.currentXP=e},e.prototype.getCurrentXP=function(){return this.currentXP},e.prototype.getTotalXP=function(){for(var e=this.currentXP,t=0;t<this.level;t++)e+=o.LEVEL_UP_XP[t];return e},e.prototype.setType=function(e){this.type=e},e.prototype.getType=function(){return this.type},e.prototype.setSide=function(e){this.side=e},e.prototype.getSide=function(){return this.side},e.prototype.incrementMoveCounter=function(){this.moveCounter++},e.prototype.setMoveCounter=function(e){this.moveCounter=e},e.prototype.getMoveCounter=function(){return this.moveCounter},e.prototype.highlightPiece=function(){this.highlighted=!0},e.prototype.unhighlightPiece=function(){this.highlighted=!1},e.prototype.getHighlight=function(){return this.highlighted},e.prototype.getInitialSquare=function(){return this.initialSquare},e.prototype.possibleAbilities=function(){if(this.type===o.PieceTypes.EMPTY)return[];for(var e=Object.values(o.PieceAbilities).filter((function(e){return!isNaN(Number(e))})),t=[o.PieceAbilities.NONE],i=this.abilities,r=0,s=e;r<s.length;r++){var a=s[r];Number(a)>=100&&Number(a)<200&&t.push(Number(a))}var n=1;this.type===o.PieceTypes.PAWN&&(n=2),this.type===o.PieceTypes.KNIGHT&&(n=3),this.type===o.PieceTypes.BISHOP&&(n=4),this.type===o.PieceTypes.ROOK&&(n=5),this.type===o.PieceTypes.QUEEN&&(n=6),this.type===o.PieceTypes.KING&&(n=7);for(var p=0,h=e;p<h.length;p++)a=h[p],Number(a)>=100*n&&Number(a)<100*(n+1)&&t.push(Number(a));for(var u=function(e){t=t.filter((function(t){return t!==e}))},d=0,S=i;d<S.length;d++)u(S[d]);return t},e.prototype.attackRange=function(e){var t=this.directions.indexOf(e);return-1===t?-1:this.range[t]},e.prototype.hasLineAttack=function(){return-1!=this.directions.indexOf(o.Direction.LINE)},e.prototype.hasDiagonalAttack=function(){return-1!=this.directions.indexOf(o.Direction.DIAGONAL)},e.prototype.hasKnightAttack=function(){return-1!=this.directions.indexOf(o.Direction.L)},e.prototype.hasCamelAttack=function(){return-1!=this.directions.indexOf(o.Direction.CAMEL)},e.prototype.hasPawnAttack=function(){return-1!=this.directions.indexOf(o.Direction.PAWN)},e}();t.Piece=r,t.oppositePiece=function(e,t){return e.getSide()===o.Side.WHITE&&t.getSide()===o.Side.BLACK||e.getSide()===o.Side.BLACK&&t.getSide()===o.Side.WHITE},t.oppositeSide=function(e,t){return e===o.Side.WHITE&&t===o.Side.BLACK||e===o.Side.BLACK&&t===o.Side.WHITE},t.sameSidePiece=function(e,t){return e.getSide()===o.Side.WHITE&&t.getSide()===o.Side.WHITE||e.getSide()===o.Side.BLACK&&t.getSide()===o.Side.BLACK},t.sameSide=function(e,t){return e===o.Side.WHITE&&t===o.Side.WHITE||e===o.Side.BLACK&&t===o.Side.BLACK},t.isQueenOrRook=function(e){return e.getType()===o.PieceTypes.QUEEN||e.getType()===o.PieceTypes.ROOK},t.isQueenOrBishop=function(e){return e.getType()===o.PieceTypes.QUEEN||e.getType()===o.PieceTypes.BISHOP},t.isKnight=function(e){return e.getType()===o.PieceTypes.KNIGHT},t.hasLineAttack=function(e){return-1!=e.getDirections().indexOf(o.Direction.LINE)},t.isPawn=function(e){return e.getType()===o.PieceTypes.PAWN},t.isKing=function(e){return e.getType()===o.PieceTypes.KING}},412:(e,t)=>{var i,o,r,s,a;Object.defineProperty(t,"__esModule",{value:!0}),t.PieceAbilities=t.PieceTypes=t.Side=t.Direction=t.GameResult=t.PER_MOVE_XP=t.CAPTURE_MULTIPLIER=t.LEVEL_UP_XP=t.INFINITE_TIME=t.INFINITE_RANGE=void 0,t.INFINITE_RANGE=255,t.INFINITE_TIME=-1,t.LEVEL_UP_XP=[10,12,15,17,19,20,22,24,25,27,29,30,32,35],t.CAPTURE_MULTIPLIER=.5,t.PER_MOVE_XP=5,function(e){e[e.BLACK_WIN=-1]="BLACK_WIN",e[e.DRAW=0]="DRAW",e[e.WHITE_WIN=1]="WHITE_WIN",e[e.IN_PROGRESS=2]="IN_PROGRESS"}(i||(t.GameResult=i={})),function(e){e.LINE="LINE",e.DIAGONAL="DIAGONAL",e.L="L",e.PAWN="PAWN",e.CAMEL="CAMEL"}(o||(t.Direction=o={})),function(e){e.WHITE="WHITE",e.BLACK="BLACK",e.NONE="NONE"}(r||(t.Side=r={})),function(e){e.EMPTY=".",e.PAWN="p",e.BISHOP="b",e.KNIGHT="n",e.ROOK="r",e.QUEEN="q",e.KING="k"}(s||(t.PieceTypes=s={})),function(e){e[e.NONE=-1]="NONE",e[e.SCOUT=200]="SCOUT",e[e.QUANTUM_TUNNELING=203]="QUANTUM_TUNNELING",e[e.SMOLDERING=301]="SMOLDERING",e[e.CAMEL=302]="CAMEL",e[e.COLOR_COMPLEX=402]="COLOR_COMPLEX",e[e.ARCHBISHOP=403]="ARCHBISHOP",e[e.HAS_PAWN=501]="HAS_PAWN",e[e.CHANCELLOR=502]="CHANCELLOR",e[e.SWEEPER=601]="SWEEPER",e[e.SKIP=700]="SKIP",e[e.ON_HORSE=702]="ON_HORSE",e[e.ON_CAMEL=705]="ON_CAMEL"}(a||(t.PieceAbilities=a={}))}},t={};function i(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,i),s.exports}var o={};(()=>{var e=o;Object.defineProperty(e,"__esModule",{value:!0}),e.Game=void 0;var t=i(412),r=i(941);e.Game=function(){function e(i,o,s,a){void 0===a&&(a=!1),this.gameId=e.gameIdCounter,e.gameIdCounter++,this.whiteId=i,this.blackId=o,this.gameState=new r.GameState(s,0,t.INFINITE_TIME,t.INFINITE_TIME,a),this.gameResult=t.GameResult.IN_PROGRESS}return e.prototype.getWhiteId=function(){return this.whiteId},e.prototype.getBlackId=function(){return this.blackId},e.prototype.getGameState=function(){return this.gameState},e.gameIdCounter=1e3,e}()})(),GameBundle=o})();
import { Response } from "express";
import * as uuid  from 'uuid';
import { Mutex } from 'async-mutex';
import { gamesInProgress } from "./gameSocket";
import { Game } from "./Game";

const queueMutex = new Mutex();

let queue : Map <string, Map<string, Response>> = new Map();
queue.set("classicchess", new Map());
queue.set("insanityrpg", new Map());
queue.set("classicrpg", new Map());


export function joinQueue(userId: string, gamemode: string, res: Response): void {
    queueMutex.acquire().then((release) => {
      console.log(`User ${userId} joined the queue`);
      if (queue.get(gamemode)!.size > 0) {
        const opponentId = queue.get(gamemode)!.keys().next().value;
        const opponentRes = queue.get(gamemode)!.get(opponentId)!;
        if(opponentId == userId)
        {
          console.log("You are already in the queue");
          release();
          return;
        }
        console.log("Found opponent");
        queue.get(gamemode)!.delete(opponentId);
        release();
        console.log("Removed players from queue");

        let newGameId = createGame(userId, opponentId, gamemode);
        opponentRes.redirect(`/game/${newGameId}`);
        res.redirect(`/game/${newGameId}`);
        console.log("Redirected players to game");
      } else {
        console.log("Waiting for opponent");
        queue.get(gamemode)!.set(userId, res);
        release();
      }


    }).catch((err) => {
        console.log(err);
    })
}

export function leaveQueue(userId: string, gamemode: string): void {
    queueMutex.acquire().then((release) => {
        queue.get(gamemode)!.delete(userId);
        console.log("User " + userId + " left the queue");
        release();
    }).catch((err) => {
        console.log(err);
    });
}

function createGame(userId: string, opponentId: string, gamemode: string) : string {
    const newGameId = uuid.v4();
    let whiteId = Math.random() < 0.5 ? userId : opponentId;
    let blackId = whiteId == userId ? opponentId : userId;

    if(gamemode == "classicchess" || gamemode == "classicrpg")
      gamesInProgress.set(newGameId, new Game(whiteId, blackId, "8 8/rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"));
    else if(gamemode == "insanityrpg")
      gamesInProgress.set(newGameId, new Game(whiteId, blackId, "15 15/rnbqbnrkrnbqbnr/ppppppppppppppp/15/15/15/15/15/15/15/15/15/15/15/PPPPPPPPPPPPPPP/RNBQBNRKRNBQBNR"));

    return newGameId
}
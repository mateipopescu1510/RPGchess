import { Response } from "express";
import * as uuid  from 'uuid';
import { Mutex } from 'async-mutex';
import { gamesInProgress } from "./gameSocket";
import { Game } from "./Game";

const queueMutex = new Mutex();

let queue : Map <string, Response> = new Map();


export function joinQueue(userId: string, res: Response): void {
    queueMutex.acquire().then((release) => {
      console.log(`User ${userId} joined the queue`);
      if (queue.size > 0) {
        const opponentId = queue.keys().next().value;
        const opponentRes = queue.get(opponentId)!;
        queue.delete(opponentId);
        release();

        let newGameId = createGame(userId, opponentId);
        opponentRes.redirect(`/game/${newGameId}`);
        res.redirect(`/game/${newGameId}`);
      } else {
        queue.set(userId, res);
        release();
      }


    }).catch((err) => {
        console.log(err);
    })
}

export function leaveQueue(userId: string): void {
    queueMutex.acquire().then((release) => {
        queue.delete(userId);
        release();
    }).catch((err) => {
        console.log(err);
    });
}

function createGame(userId: string, opponentId: string) : string {
    const newGameId = uuid.v4();
    let whiteId = Math.random() < 0.5 ? userId : opponentId;
    let blackId = whiteId == userId ? opponentId : userId;
    gamesInProgress.set(newGameId, new Game(whiteId, blackId, "8 8/rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"));

    return newGameId
}
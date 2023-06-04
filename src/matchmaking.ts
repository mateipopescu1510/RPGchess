import { Response } from "express";
import * as uuid  from 'uuid';
import { Mutex } from 'async-mutex';

const queueMutex = new Mutex();

let queue : Map <string, Response> = new Map();


export function joinQueue(userId: string, res: Response): void {
    queueMutex.acquire().then((release) => {
      console.log(`User ${userId} joined the queue`);
      if (queue.size > 0) {
        const opponentId = queue.keys().next().value;
        const newGameId = uuid.v4();
        queue.get(opponentId)!.redirect(`/game/${newGameId}`);
        res.redirect(`/game/${newGameId}`);
        queue.delete(opponentId);
      } else {
        queue.set(userId, res);
      }
      release();

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
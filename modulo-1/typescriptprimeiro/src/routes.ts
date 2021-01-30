import { Request, Response } from 'express';
import CreateUser from './services/CreateUser';

export function helloGoStack(request: Request, response: Response) {
    const user = CreateUser({
        name: 'Geninho',
        email: 'geninhocell@gmail.com',
        password: '123456',
        techs: [ 
            'NodeJS', 
            'ReactJS', 
            'ReactNative',
            { title: 'Javascript', experience: 100 },
        ],
    });
    return response.json({ message: 'Hello GoStack'});
};
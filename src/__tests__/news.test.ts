import request from 'supertest';
import createServer from '../index';
import { getNewsINF } from '../Controllers/news.controller';
import axios from 'axios';
import app from '../index';

jest.mock('axios');

describe('GET /news/inf', () => {
    describe('when API call is successful', () => {
        it('should return news from inf', async () => {
            const news = [
                {
                    photo: 'https://inf.ug.edu.pl/media/1856/icon.jpg',
                    link: 'https://inf.ug.edu.pl/ziug',
                    datetime: '2022-11-14',
                    title: 'IX Zawody Informatyczne Uniwersytetu Gdańskiego',
                    body: 'Zapraszamy studentów wydziału MFI UG na IX Zawody Informatyczne Uniwersytetu Gdańskiego, które odbędą się 17 grudnia 2022 r. w godzinach 10:00 – 14:00 w budynku Informatyki Praktycznej.',
                },
                {
                    photo: 'https://inf.ug.edu.pl/tmbs/pin.png',
                    link: 'https://inf.ug.edu.pl/poradnik1roku',
                    datetime: '2022-09-28',
                    title: 'Poradnik IT dla studentów Wydziału MFI',
                    body: 'Najważniejsze zagadnienia dotyczące korzystania z laboratoriów komputerowych i sieci lokalnej [w tym bezprzewodowej] dla osób stawiających pierwsze kroki na Wydziale MFI.',
                },
                {
                    photo: 'https://inf.ug.edu.pl/tmbs/kbd.jpg',
                    link: 'https://inf.ug.edu.pl/problem',
                    datetime: '2020-03-31',
                    title: 'Zgłaszanie problemów IT',
                    body: 'Przypominamy, że wszelkie problemy dotyczące spraw IT można zgłaszać przez formularz.',
                },
            ];
            const resp = { data: news };
            (
                axios.get as jest.MockedFunction<typeof axios.get>
            ).mockResolvedValue(resp);
            const result = await axios.get('127.0.0.1:3000/news/inf');
            return expect(result.data).toEqual(news);
        });
    });

    describe('when API call fails', () => {
        it('should not return news from inf', async () => {
            const message = 'Network Error!';
            (
                axios.get as jest.MockedFunction<typeof axios.get>
            ).mockRejectedValueOnce(new Error(message));
            const result = await axios.get('127.0.0.1:3000/news/inf');
            return expect(result.data.message).toEqual('Could not get data!');
        });
    });
});

describe('GET /news/mfi', () => {
    describe('when API call is successful', () => {
        it('should return news from mfi', async () => {
            await request(app).get('/news/mfi').expect(200);
        });
    });
});

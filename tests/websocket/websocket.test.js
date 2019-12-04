/* eslint-disable no-undef */
let client = null;

export default (Client) => describe('websocket', () => {
    beforeAll((done) => {
        client = new Client(CONNECTION.host, ADMIN.group, {
            autoReconnect: false,
            useTLS: false,
            httpPort: CONNECTION.httpPort,
            wssPort: CONNECTION.wsPort,
            logger: 'noop',
        });
        client.on('loggedIn', () => {
            client.on('connected', () => done());
            client.connect();
        });
        client.login(ADMIN.email, ADMIN.password, null);
    });

    afterAll(() => {
        client.disconnect();
    });
    /*
    beforeAll(() => {
    });
    afterAll(() => {
    });
    */
    test('websocket message on send has correct shape', (done) => {
        const sendTest = client._send({ foo: 'bar' });
        expect(sendTest).toMatchObject(WSMESSAGE.mock);
        done();
    });
});

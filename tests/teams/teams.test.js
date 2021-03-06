/* eslint-disable no-undef */
let client = null;
let teamID;

export default (Client) => describe('teams', () => {
    beforeAll((done) => {
        client = new Client(CONNECTION.host, ADMIN.team, {
            autoReconnect: false,
            useTLS: false,
            httpPort: CONNECTION.httpPort,
            wssPort: CONNECTION.wsPort,
            logger: 'noop',
        });
        client.on('loggedIn', () => {
            done();
        });
        client.Authentication.login(ADMIN.email, ADMIN.password, null);
    });

    afterAll(() => {
        client.Websocket.disconnect();
    });

    /*
    beforeEach((done) => {
    });

    afterEach(() => {
    });
    */

    test('get teams for user', (done) => {
        client.on('teamsLoaded', (teamData) => {
            teamData.forEach((team) => {
                expect(team).toMatchObject(TEAM.mock);
            });
            done();
        });
        client.Team.getTeams();
    });

    test('get team by name', (done) => {
        client.on('teamsByNameLoaded', (teamData) => {
            expect(teamData).toMatchObject(TEAM.mock);
            teamID = teamData.id;
            done();
        });
        client.Team.getTeamByName(ADMIN.team);
    });

    test('return teams route', () => {
        expect(client.Team.teamRoute()).toEqual(`/users/me/teams/${teamID}`);
    });
});

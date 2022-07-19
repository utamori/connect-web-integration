// https://docs.cypress.io/api/introduction/api.html
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { ElizaService } from '../../src/gen/buf/connect/demo/eliza/v1/eliza_connectweb.js'
import { IntroduceRequest } from '../../src/gen/buf/connect/demo/eliza/v1/eliza_pb.js'

describe('My First Test', () => {
    it('visits the app root url', () => {
        cy.visit('/')
        cy.contains('h1', 'Eliza')

        expect(ElizaService).to.not.be.undefined
        expect(IntroduceRequest).to.not.be.undefined

        const client = createPromiseClient(
            ElizaService,
            createConnectTransport({
                baseUrl: 'https://demo.connect.build',
            })
        )

        expect(client.say).to.not.be.undefined
        expect(client.introduce).to.not.be.undefined

        cy.get('#name-input').type('Steve')
        cy.get('button.intro-button').click()
        cy.contains('p.resp-text', "Hi Steve. I'm Eliza.")

        cy.get('#statement-input').type('Happy')
        cy.get('button.say-button').click()
        cy.wait(500)
        cy.get('#statement-input').clear()
        cy.get('#statement-input').type('Goodbye')
        cy.get('button.say-button').click()
    })
})

import nats, { Stan } from 'node-nats-streaming'

class NatsWrapper {
    private _client?: Stan

    get client() {
        if(!this._client) {
            throw new Error('Cannot access Nasts client before connecting')
        }

        return this._client
    }
    
    connect(clusterId: string, clientId:  string, url: string) {
        this._client = nats.connect(clusterId, clientId,{ url })

        return new Promise((resolve, reject) => {
            this.client.on('connect', () => {
                console.log('Connected to Nats')
                resolve({ msg: 'Connected to Nats' })
            })

            this.client.on('error', (err) => {
                reject(err)
            })
        })
        
    }
}

export const natsWrapper = new NatsWrapper()
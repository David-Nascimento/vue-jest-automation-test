import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')
const leilao = {
    produto: 'Um produto',
    lanceInicial: 49,
    descrucai: 'Uma descrição qualquer'
}

const lances = [
    {
        id: 1,
        valor: 1000,
        data: '2020-06-13T18:32:26.826Z',
        leilao_id: 1
    },
    {
        id: 2,
        valor: 1990,
        data: '2020-06-13T18:23:26.826Z',
        leilao_id: 1
    },
    {
        id: 3,
        valor: 1085,
        data: '2020-06-13T18:44:26.826Z',
        leilao_id: 1
    }
]

describe('Leiloeiro inicia um leilão que não possui lances', () => {
    test('avisa quando não existem lances', async () => { 
        
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce([])

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBe(true)
    })
})

describe('Um leiloeiro exibe os lances existentes', () => {
    test('Não monstra o aviso de "sem lances"', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()
        const listaSemLances = wrapper.find('.alert-dark')

        expect(listaSemLances.exists()).toBe(false)
    })

    test('Possui uma lista de lances', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()
        const listaLances = wrapper.find('.list-inline')

        expect(listaLances.exists()).toBe(true)
    })
})

describe('Um leiloeiro comunica os valores de menor e maior lance', () => {
    test('Mostra o maior lance daquele leilão', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()
        const maiorLance = wrapper.find('.maior-lance')
        expect(maiorLance.element.textContent).toContain('Maior lance: R$ 1990')
    })

    test('Mostra o menor lance daquele leilão', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()
        const menorLance = wrapper.find('.menor-lance')
        expect(menorLance.element.textContent).toContain('Menor lance: R$ 1000')
        
    })
})
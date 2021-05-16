import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'

jest.mock('@/http')
const leilao = {
    produto: 'Um produto',
    lanceInicial: 49,
    descrucai: 'Uma descrição qualquer'
}

describe('Leiloeiro inicia um leilão que não possui lances', () => {
    test('avisa quando não existem lances', () => { 
        
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce([
            {
                id: 1,
                valor: 100,
                data: '2021-01-15',
                leilao_id: 1 
            }
        ])

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBe(true)
    })
})
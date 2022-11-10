(() => {
    const abas = document.querySelectorAll('[data-aba]')
    
    esconderConteudos = () => {
        const conteudos = document.querySelectorAll('[data-conteudo]')

        conteudos.forEach(conteudo => conteudo.classList.add('d-none'))
    }

    inativarAbas = () => {
        abas.forEach(aba => aba.classList.remove('active'))
    }

    ativarConteudo = (valor) => {
        const conteudo = document.querySelectorAll(`[data-conteudo="${valor}"]`)

        conteudo.classList.remove('d-none')
    }

    ativarAba = (aba) => {
        aba.classList.add('active')
    }

    abas.forEach(aba => aba.addEventListener('click', () => {
        const valor = aba.dataset.aba
        
        esconderConteudos()
        inativarAbas()
        ativarConteudo(valor)
        ativarAba(aba)
    }))
})()
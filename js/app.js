class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();

    }
    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }
    senhasSaoValidas(){
        let valid = true;

       const senha =  this.formulario.querySelector('.senha');
       const repetirSenha =  this.formulario.querySelector('.repetir-senha');

       if(senha.value !== repetirSenha.value){

        valid = false;
        this.criaErro(senha, 'Campos de senha repetir senha precisa ser iguais');
        this.criaErro(repetirSenha, 'Campos de senha repetir senha precisa ser iguais');

       }

       if(senha.value.length < 6 || senha.value.length > 12){
        valid = false;
        this.criaErro(senha, 'Senha precisa ter 6 e 12 caracteres.')
       }

        return valid;
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.checaCampos();
       const senhasValidas = this.senhasSaoValidas(); 

       if(camposValidos && senhasValidas){
        alert('Formulario enviado');
        this.formulario.submit();
       }
    }
    validaUsuario(campo){
        const usuario = campo.value;

        if( usuario.length < 3 || usuario.length >12){
            this.criaErro(campo, 'usuario precisa ter entre 3 e 12 caracteres!')
        }
        
        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.criaErro(campo, 'Nome do ususario precisa ter somente letras e números!')
        }
        return true;
    }

    checaCampos() {
        let valid = true;

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;

            if (!campo.value) {
                this.criaErro(campo, 'campo tal esta em branco');
                valid = false;
            }
            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) valid = false;
            }
            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) valid = false;
            }
        }
        return valid; 

    }
        validaCPF(campo) {
            const cpf = new ValidaCPF(campo.value);

            if (!cpf.valida()) {
                this.criaErro(campo, 'CPF invalido');
                return false;
            }
            return true;
        }
    
    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();

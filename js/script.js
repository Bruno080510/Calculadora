const information = document.querySelector("#usuarioInformacao")
const backInformation = document.querySelector("#back-operation")
const botoesOperations = document.querySelectorAll("#opcao button")

class Calculo{
    constructor(backInformation, information){
        this.backInformation = backInformation
        this.information = information
        this.cliquesAgora = ""
    }

    addDigit(digit){
         if(digit === "." && this.information.innerText.includes(".")){
            return;
        }
        this.cliquesAgora = digit
        this.updateScreen()
    }

    processoMudar(operation){
        if(this.information.innerText === "" && operation !== "C"){
            if(this.backInformation.innerText !== ""){
                this.mudar(operation)
            }
            return
        }

        let operationAction 
        let previous = +this.backInformation.innerText.split(" ")[0]
        let agora = +this.information.innerText

        switch (operation) {
            case "+":
                operationAction = previous + agora
                this.updateScreen(operationAction, operation, agora, previous)
                break
            case "-":
                operationAction = previous - agora
                this.updateScreen(operationAction, operation, agora, previous)
                break
            case "*":
                operationAction = previous * agora
                this.updateScreen(operationAction, operation, agora, previous)
                break
            case "/":
                operationAction = previous / agora
                this.updateScreen(operationAction, operation, agora, previous)
                break
            case "DEL":
                this.funcionamentoDel()
                break
            case "CE":
                this.funcionamentoCe()
                break
            case "C":
                this.funcionamentoC()
                break
            case "=":
                this.funcionamentoIgual()
                break
            default:
                return
        }
    }

    updateScreen(
        operationAction = null, 
        operation = null, 
        agora = null,
        previous = null
    ){
        if(operationAction === null){
            this.information.innerText += this.cliquesAgora
        }
        else{
            if(previous === 0 ){
                operationAction = agora
            }

            this.backInformation.innerText = `${operationAction} ${operation}`
            this.information.innerText = ""
        }
    }
    mudar(operation){
        const mathmudar = ["+", "*", "/", "-"]
        if(!mathmudar.includes(operation)){
            return
        }
        this.backInformation.innerText = this.backInformation.innerText.slice(0, -1) + operation
    }

    funcionamentoDel(){
        this.information.innerText =  this.information.innerText.slice(0, -1)
    }

    funcionamentoCe(){
        this.information.innerText = ""
    }

    funcionamentoC(){
        this.information.innerText = ""
        this.backInformation.innerText = ""
    }

    funcionamentoIgual(){
        const operation = backInformation.innerText.split(" ")[1]
        this.processoMudar(operation)
    }
}

const calculation = new Calculo(backInformation, information)

botoesOperations.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const valor = e.target.innerText
        if(+valor >= 0 || valor === "."){
            calculation.addDigit(valor)
        } 
        else{
            calculation.processoMudar(valor)
        }
    })
})


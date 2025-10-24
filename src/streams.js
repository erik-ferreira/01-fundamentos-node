import { Readable, Transform, Writable } from "node:stream"

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        // O this.push serve para enviar partes das informações, só que colocando
        // null ele vai para a stream
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        // O push não aceita tipos primitivos, então tem que criar um buffer com o valor para
        // ele conseguir envia aos poucos
        this.push(buf)
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    // O primeiro parâmetro do callback é um erro(new Error('')), porem posso enviar como null para
    // informar que não deu erro nenhum
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable {
  // chunk é o pedaço que foi lido da stream de leitura
  // encoding é como a informação esta codificada
  // callback é uma função que a stream de escrita precisa chamar quando ela terminar de executar
  // Detalhe que em uma stream de escrita não se retorna nada, ela processa um dado, e não
  // transforma em alguma outra coisa
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

// process.stdout
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())

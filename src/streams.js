import { Readable } from "node:stream"

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        // O this.push server para enviar partes das informações, só que colocando
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

new OneToHundredStream().pipe(process.stdout)

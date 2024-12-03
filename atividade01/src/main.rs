use std::io;


// Definindo a função principal que chamará  funções questao_01 e questao_02
fn main() {
    // Chame as funções conforme necessário para teste
    questao_01();
    println!("\n");
    questao_02(); 
}



fn questao_01() {
    println!("Questão 01: Executando a lógica da questão 1.");

    let numeros = [2, -3, 7, 4, 8, 4, 5, -4, 6, 10];
    
    // Chamando a função media_positivos e tratando o resultado com match
    match media_positivos(numeros) {
        Some(media) => println!("Média dos números positivos: {}", media),   //o some é tipo uma variante do option,igual o None
        None => println!("Não há números positivos."),
    }
    // Chamando a função produto_pares e imprimindo o resultado
    let produto = produto_pares(numeros);
    println!("Produto dos números pares: {}", produto);


    // Função que calcula a média dos números positivos em um array
    fn media_positivos(array: [i32; 10]) -> Option<f64> { //retorna a função
        // Filtra os números positivos e calcula a soma e a quantidade de elementos
        let positivos: Vec<i32> = array
                                    .iter() //cria um iterador que percorre referências aos elementos do array. Isso significa que você está acessando os elementos, mas não os copiando nem modificando.                     
                                    .cloned() // Copia os valores do iterador, criando um novo iterador de valores (em vez de referências).
                                    .filter(|&x| x > 0)  //Filtra os elementos do iterador, mantendo apenas aqueles que são maiores que 0 (ou seja, apenas os números positivos).
                                    .collect(); //Coleta os valores filtrados e os coloca em um Vec<i32>, que é um vetor de inteiros.
        
        if positivos.is_empty() {
            return None; // Retorna None se não houver números positivos
        }

        let soma: i32 = positivos.iter().sum();
        let media = soma as f64 / positivos.len() as f64; // Calcula a média
        Some(media) // usa o Some() para retornar a média como Option<f64>
    }

    // Função que calcula o produto de todos os números pares em um array
    fn produto_pares(array: [i32; 10]) -> i32 {
        // Itera pelos elementos, filtra os pares e calcula o produto
        array.iter()
            .filter(|&&x| x % 2 == 0) // Filtra apenas os números pares
            .fold(1, |produto, &x| produto * x) // Calcula o produto, com 1 como valor inicial. pega o resultado da função anonima e depois calcula em cima dos paramentos
    }                                           //produto é o elemento anterior; o &x é a referencia pro proximo elemento
                                                //Em Rust, a última expressão de uma função é retornada automaticamente se 
                                                //não houver um return explícito
}


fn questao_02() {
    println!("Questão 02: Executando a lógica da questão 2.");
    
    // Solicita ao usuário os três números inteiros
    println!("Insira o primeiro número:");
    let num1 = ler_inteiro();
    
    println!("Insira o segundo número:");
    let num2 = ler_inteiro();
    
    println!("Insira o terceiro número:");
    let num3 = ler_inteiro();
    
    // Cria a tupla com os números inseridos
    let tupla = (num1, num2, num3);
    
    // Chama a função analisar_tupla e recebe a tupla resultante
    let (soma, maior, menor) = analisar_tupla(tupla);
    
    // Exibe os resultados
    println!("Soma dos números: {}", soma);
    println!("Maior número: {}", maior);
    println!("Menor número: {}", menor);


    fn ler_inteiro() -> i32 {
        // variavel mutavel que recebe o resultado de uma Função que lê um número inteiro do teclado
        let mut input = String::new();

        io::stdin()
            .read_line(&mut input)
            .expect("Falha ao ler a linha"); //tipo o catch

        input
            .trim()
            .parse()
            .expect("Por favor, insira um número válido") //tipo o catch
    }

    fn analisar_tupla(tupla: (i32, i32, i32)) -> (i32, i32, i32) {
        // Função que analisa a tupla e retorna (soma, maior, menor)
        let soma = tupla.0 + tupla.1 + tupla.2;
        let maior = tupla.0.max(tupla.1).max(tupla.2);  //No Rust, os métodos max e min são utilizados para encontrar, 
                                                        //respectivamente, o maior e o menor valor entre dois números.
        let menor = tupla.0.min(tupla.1).min(tupla.2);
        
        (soma, maior, menor) // Retorna a tupla com os resultados. Em Rust, a última expressão de uma função é retornada automaticamente se 
                             //não houver um return explícito
    }
}

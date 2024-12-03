use std::io; //fazer importe
use std::cmp::Ordering;  //pega ordering de cmp
use rand::Rng;

fn main() {
    println!("**GUESS THE NUMBER**");

    //generating random number
    let secret_number = rand::thread_rng()
                                .gen_range(1..=100);
                        
    println!("The secret number is: {secret_number}");

    loop {
        println!("Please, input your guess:");

        //tudo que for ler do teclado é String
        let mut guess = String::new();  //variaveis por padrão no rust são imutáveis
                                        //então tem que colocar "mut" pra falar que a variavel é mutavel

        io::stdin()   //existe camel case e snake case, esse que fazemos é o snake case
            .read_line(&mut guess) //read_line precisa de uma referencia
            .expect("Failed to read line");  //é como o catch do java script
        
        //parse to integer (usando shadowing)
        let guess: u32 = match guess 
                            .trim()
                            .parse()  //retorna um enumeration(Result) que são Ok e Err
                            {
                                Ok(num)=> num,   //função anomina Ok para verificar o numero
                                Err(_) => {print!("Enter a valid number! \n");continue;}, //continue desconsidera oque tem embaixo e reinicia o loop
                            };
                            

        println!("You guessed: {}",guess);
        
        //comparing guess with secret_number
        match guess.cmp(&secret_number){
            Ordering::Less => println!("To small"),
            Ordering::Greater => println!("To big"),
            Ordering::Equal => {
                                println!("You Win");
                                break;
                               },
        } //match-cpm 
    }

}


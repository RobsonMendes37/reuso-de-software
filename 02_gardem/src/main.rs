use crate::garden::vegetables::Asparagus;

pub mod garden;
pub mod kitchen;
pub mod roon {
    pub fn who_am_i(){
        println!("I am the room!")
    }
}

fn main() {
    let plant = Asparagus{};
    println!("Hello, world!");
}

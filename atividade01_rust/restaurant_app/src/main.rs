fn main() {
    restaurant::front_of_house::hosting::add_to_wait_list();
    restaurant::front_of_house::serving::take_order();
    restaurant::back_of_house::take_care_trash();
    println!("PI value is {}", restaurant::PI);
}

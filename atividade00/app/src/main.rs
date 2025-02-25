use restaurant::front_of_house::hosting;
use restaurant::back_of_house::trash;

fn main() {
    hosting::add_to_wait_list();
    hosting::seat_at_table();
    trash::take_care_trash();
}
package raamatukogu;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface BookRepository extends CrudRepository<Book, Long> {
    Optional<Book> findByTitle(String title);
}
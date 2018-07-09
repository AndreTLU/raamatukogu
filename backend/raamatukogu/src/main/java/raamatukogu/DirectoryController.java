package raamatukogu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.origin.SystemEnvironmentOrigin;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.Optional;

@Controller
@RequestMapping("/api/books")
public class DirectoryController {
    @Autowired
    private BookRepository bookRepository;

    @PostMapping("")
    public @ResponseBody String addNewBook(@RequestParam String title, @RequestParam String author){
        Book b = new Book();
        b.setTitle(title);
        b.setAuthor(author);
        b.setRented("false");
        bookRepository.save(b);
        return "Saved";
    }

    @PutMapping("/{bookId}")
    public @ResponseBody Book updateBook(@PathVariable Long bookId, @RequestParam String rented){
        System.out.print(bookId);
        Book b = bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException(bookId));
        b.setRented(rented);
        bookRepository.save(b);
        return b;
    }
    @GetMapping("/{bookId}")
    public @ResponseBody
    Optional<Book> getBook(@PathVariable Long bookId){
        return bookRepository.findById(bookId);
    }

    @GetMapping("")
    public @ResponseBody Iterable<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public class ResourceNotFoundException extends RuntimeException{
        public ResourceNotFoundException(long bookId){
            super("Book " + bookId + " does not exist.");
        }
    }
}

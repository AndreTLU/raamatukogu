package raamatukogu;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Rent {
    @Id
    @GeneratedValue
    private long id;

    @JsonIgnore
    @ManyToOne
    private Book book;

    public Book getBook(){
        return this.book;
    }

    public void setBook(Book book){
        this.book = book;
    }
}

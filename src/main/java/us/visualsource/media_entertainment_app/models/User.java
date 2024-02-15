package us.visualsource.media_entertainment_app.models;


import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "users",
        uniqueConstraints = {@UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")})
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @NonNull
    @NotBlank
    @Size(max = 20)
    @Getter
    @Setter
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    @Getter
    @Setter
    private String email;

    @NotBlank
    @Size(max = 120)
    @Getter
    @Setter
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @Getter
    @Setter
    private Set<Role> roles = new HashSet<>();

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

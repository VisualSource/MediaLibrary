package us.visualsource.media_entertainment_app.models;


import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.management.InvalidAttributeValueException;
import org.springframework.util.StringUtils;
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

        @Getter
        @NonNull
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID jwtId;

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

        @Getter
        @Setter
        private String avatar;

        @ManyToMany(fetch = FetchType.LAZY)
        @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
                        inverseJoinColumns = @JoinColumn(name = "role_id"))
        @Getter
        @Setter
        private Set<Role> roles = new HashSet<>();

        @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true,
                        mappedBy = "owner")
        @Getter
        private Set<Bookmark> bookmarks = new HashSet<>();

        public User(String username, String email, String password) {
                this.username = username;
                this.email = email;
                this.password = password;
                this.jwtId = UUID.randomUUID();
        }

        public void GenerateAvatar() throws InvalidAttributeValueException {
                String name = this.username;
                if (name == null)
                        throw new InvalidAttributeValueException(
                                        "Username prop has not been set yet.");
                this.avatar = "https://api.dicebear.com/7.x/shapes/svg?seed="
                                .concat(StringUtils.trimAllWhitespace(name));
        }
}

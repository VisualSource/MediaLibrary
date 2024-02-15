package us.visualsource.media_entertainment_app.models;

import jakarta.persistence.*;
import lombok.*;
import us.visualsource.media_entertainment_app.enums.ERole;

@Entity
@Table(name = "roles")
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    @Getter
    @Setter
    private ERole name;

    public Role(ERole name) {
        this.name = name;
    }
}


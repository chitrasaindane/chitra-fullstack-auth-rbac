package com.rbac.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    private String email;
    
    @NotBlank(message = "Password is required")
    private String password;
}

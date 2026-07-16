package com.jobtracker.exception;

public class MethodArgumentNoValidException extends RuntimeException{
    public MethodArgumentNoValidException(String message) {
        super(message);
    }
}

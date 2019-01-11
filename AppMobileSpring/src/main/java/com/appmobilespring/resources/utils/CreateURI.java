package com.appmobilespring.resources.utils;

import java.net.URI;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class CreateURI {

	public static URI create(Integer id) {
		return ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();
	}
}

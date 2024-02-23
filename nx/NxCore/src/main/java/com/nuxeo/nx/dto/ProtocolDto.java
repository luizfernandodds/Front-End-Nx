package com.nuxeo.nx.dto;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProtocolDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private Long sys_id;
	private ProviderDto provider;

	public ProtocolDto() {
	}

}
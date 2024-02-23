package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class DriverDto implements Serializable {

	
	private static final long serialVersionUID = -1549960640687579950L;
	
	private Long id;
	private CustomerDto customer;
	private LoginDto login;
	private Long idQuestor;
	private String name;
	private String email;
	private String phone;
	private String cpf;
	private String rg;
	private String cnh;
	private String categoryCnh;
	private String contact;
	private String phoneContact;
	private LocalDateTime dateActive;
	private LocalDateTime dateDesactive;
	private LocalDateTime dateCnhExpire;
	private String address;
	private Integer number;
	private Integer zip;
	private String ibutton;
	private String rfid;
	private CityDto city;
	private String typeHiring;
	private String responsibleName;
	private String responsibleEmail;
	private String responsiblePhone;
	private Boolean notifyEmail = false;
	private Boolean notifySms = false;
	private String pass;
//	private Journey Journey;
	private String idMobile;
	private LocalDateTime dateDelete;
	
	public DriverDto() {
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DriverDto other = (DriverDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

}
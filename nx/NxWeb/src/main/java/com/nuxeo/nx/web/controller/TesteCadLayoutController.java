/**
 * 
 */
package com.nuxeo.nx.web.controller;

import org.primefaces.event.DragDropEvent;

public interface TesteCadLayoutController {
  
  /**
   * Clean Bean Objects
   */
  public void clean();
  
  /**
   * Save Bean Objects persistence
   */
  public void save();
  
  /**
   * Remove Bean Objects persistence
   */
  public void remove();
  
  /**
   * Cancel command
   */
  public void cancel();
  
  /**
   * Help Command
   */
  public void help();
  
  /**
   * Select object in tablerow
   * 
   * @param event
   */
  
  /**
   * Add and remove dragables objects
   * 
   * @param ddEvent evento of draggable
   */
  public void onDrop(DragDropEvent event);
  
  
  /**
   * Click Button New
   */
  public void buttonNew();
  
  /**
   * Click Button Edit
   */
  public void buttonEdit(Object obj);
  
  /**
   * Click Button Edit
   */
  public void buttonRemove(Object obj);
  
}


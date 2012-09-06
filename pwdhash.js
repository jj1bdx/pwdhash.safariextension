/*
 * Remote PwdHash
 * A JavaScript implementation of the PwdHash hashing algorithm.
 * Version 1.0 Copyright (C) Stanford University 2004-2006
 * Author: Collin Jackson
 * Other Contributors: Dan Boneh, John Mitchell, Nick Miyake, and Blake Ross
 * Distributed under the BSD License
 * See http://crypto.stanford.edu/PwdHash for more info.
 * Requires the Javascript MD5 library, available here: http://pajhome.org.uk/crypt/md5
 */

/*
 * Initialize page with default hashing parameters.
 */
function Init() {
  document.hashform.domain.value = "";
  document.hashform.sitePassword.value = "";
  document.hashform.hashedPassword.value = "Press Generate";
  document.hashform.hashedPassword.disabled = true;

  // Setup event listener to fire when popover is shown
  safari.application.addEventListener("popover", PopoverHandler, true);
}

var SPH_kPasswordPrefix = "@@";

/*
 * Returns a conforming hashed password generated from the form's field values.
 */
function Generate()
{
  var uri = document.hashform.domain.value;
  var domain = (new SPH_DomainExtractor()).extractDomain(uri);
  var size = SPH_kPasswordPrefix.length;
  var data = document.hashform.sitePassword.value;
  if (data.substring(0, size) == SPH_kPasswordPrefix)
    data = data.substring(size);
  var result = new String(new SPH_HashedPassword(data, domain));
  return result;
}

/*
 * Obtain a conforming hashed password and put it in the hashed password field
 */
function GenerateToTextField()
{
  document.hashform.hashedPassword.value = Generate();
  document.hashform.hashedPassword.disabled = false;
  document.hashform.sitePassword.value = '';
}

/*
 * Update site address textfield with the current tab's domain
 */
function PopoverHandler()
{
  document.hashform.domain.value = (new SPH_DomainExtractor()).extractDomain(safari.application.activeBrowserWindow.activeTab.url);
}

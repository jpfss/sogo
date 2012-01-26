/* MAPIStoreTasksContext.m - this file is part of SOGo
 *
 * Copyright (C) 2010 Inverse inc.
 *
 * Author: Wolfgang Sourdeau <wsourdeau@inverse.ca>
 *
 * This file is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3, or (at your option)
 * any later version.
 *
 * This file is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; see the file COPYING.  If not, write to
 * the Free Software Foundation, Inc., 59 Temple Place - Suite 330,
 * Boston, MA 02111-1307, USA.
 */

#import <Foundation/NSString.h>

#import "MAPIStoreTasksFolder.h"
#import "MAPIStoreMapping.h"

#import "MAPIStoreTasksContext.h"

#undef DEBUG
#include <mapistore/mapistore.h>

@implementation MAPIStoreTasksContext

+ (NSString *) MAPIModuleName
{
  return @"tasks";
}

+ (struct mapistore_contexts_list *) listContextsForUser: (NSString *)  userName
                                                inMemCtx: (TALLOC_CTX *) memCtx
{
  struct mapistore_contexts_list *context;

  context = talloc_zero(memCtx, struct mapistore_contexts_list);
  context->url = talloc_asprintf (context, "sogo://%s@tasks/",
                                  [userName UTF8String]);
  // context->name = "Tâches personnelles";
  context->main_folder = true;
  context->role = MAPISTORE_TASKS_ROLE;
  context->tag = "tag";
  context->prev = context;

  return context;
}

- (void) setupBaseFolder: (NSURL *) newURL
{
  baseFolder = [MAPIStoreTasksFolder baseFolderWithURL: newURL
                                             inContext: self];
  [baseFolder retain];
}

@end

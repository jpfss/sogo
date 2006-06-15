/*
 Copyright (C) 2004 SKYRIX Software AG
 
 This file is part of OpenGroupware.org.
 
 OGo is free software; you can redistribute it and/or modify it under
 the terms of the GNU Lesser General Public License as published by the
 Free Software Foundation; either version 2, or (at your option) any
 later version.
 
 OGo is distributed in the hope that it will be useful, but WITHOUT ANY
 WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public
 License for more details.
 
 You should have received a copy of the GNU Lesser General Public
 License along with OGo; see the file COPYING.  If not, write to the
 Free Software Foundation, 59 Temple Place - Suite 330, Boston, MA
 02111-1307, USA.
 */
// $Id: UIxCalWeekPrintview.m 471 2004-12-13 13:33:47Z znek $

#include "UIxCalWeekOverview.h"

@interface UIxCalWeekPrintview : UIxCalWeekOverview
{
}

@end

#include "common.h"

@implementation UIxCalWeekPrintview

- (NSString *)shortTextForApt {
  NSCalendarDate  *startDate, *endDate;
  NSMutableString *aptDescr;
  NSString        *s;
  BOOL            isMyApt;
  BOOL            canAccessApt;
  BOOL            spansRange;
  id              apt;
  
  apt          = [self appointment];
  isMyApt      = [self isMyApt];
  canAccessApt = [self canAccessApt];
  spansRange   = NO;
  startDate    = [apt valueForKey:@"startDate"];
  [startDate setTimeZone:[self viewTimeZone]];
  endDate      = [apt valueForKey:@"endDate"];
  if(endDate != nil) {
    [endDate setTimeZone:[self viewTimeZone]];
    spansRange = ![endDate isEqualToDate:startDate];
  }
  aptDescr = [[NSMutableString alloc] init];
  [aptDescr appendFormat:@"<span class=\"%@\">%02i:%02i",
                           isMyApt ? @"weekprintview_apt_time" :
                                     @"weekprintview_apt_time_other",
                           [startDate hourOfDay],
                           [startDate minuteOfHour]];
  if(spansRange) {
    [aptDescr appendFormat:@" - %02i:%02i",
                             [endDate hourOfDay],
                             [endDate minuteOfHour]];
  }
  [aptDescr appendFormat:@"</span>,"];
  if(!isMyApt)
    [aptDescr appendFormat:@"<span class=\"%@\">", [self aptStyle]];
  if (canAccessApt) {
    s = [apt valueForKey:@"title"];
    if(s) {
      [aptDescr appendFormat:@"<br />%@", s];
    }
    s = [apt valueForKey:@"location"];
    if(s) {
      [aptDescr appendFormat:@"<br />%@", s];
    }
  }
  else {
    [aptDescr appendFormat:@"<br />%@",
                             [self labelForKey:@"private appointment"]];
  }

  if(!isMyApt)
    [aptDescr appendString:@"</span>"];
  return [aptDescr autorelease];
}

- (NSString *)title {
  NSMutableString *title;
  NSCalendarDate *date;
  
  date  = [self startDate];
  title = [[NSMutableString alloc] init];
  [title appendFormat:@"%@ %d",
    [self localizedNameForMonthOfYear:[date monthOfYear]],
    [date yearOfCommonEra]];
  if([date monthOfYear] != [[self endDate] monthOfYear]) {        
    [title appendFormat:@" / %@ %d",
      [self localizedNameForMonthOfYear:[[self endDate] monthOfYear]],
      [[self endDate] yearOfCommonEra]];
  }
  [title appendFormat:@", %@ %d",
    [self labelForKey:@"Week"],
    [date weekOfYear]];
  return [title autorelease];
}

/* style sheet */

- (NSString *)titleStyle {
  if([self->currentDay isToday])
    return @"weekoverview_title_hilite";
  return @"weekoverview_title";
}

- (NSString *)contentStyle {
  if([self->currentDay isToday])
    return @"weekoverview_content_hilite";
  return @"weekoverview_content";
}

- (NSString *)aptStyle {
  if (![self isMyApt])
    return @"weekprintview_apt_other";
  return nil;
}

@end

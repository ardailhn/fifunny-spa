import { Pipe, PipeTransform } from '@angular/core';
import { Filter } from '../models/filter';
import { Place } from '../models/place';

@Pipe({
  name: 'placeFilter'
})
export class PlaceFilterPipe implements PipeTransform {

  transform(value: Place[], filter?: Filter): Place[] {
    var returnValue = value;
    if (filter == undefined) {
      return value
    }
    if(filter == null){
      return value
    }

    // Genel
    if (filter.alkol != null) {
      returnValue = returnValue.filter((p: Place) => p.filters.alkol == filter.alkol);
    }
    if (filter.nargile != null) {
      returnValue = returnValue.filter((p: Place) => p.filters.nargile == filter.nargile);
    }
    if (filter.masaOyunu != null) {
      returnValue = returnValue.filter((p: Place) => p.filters.masaOyunu == filter.masaOyunu);
    }
    if (filter.cocukUygun != null) {
      returnValue = returnValue.filter((p: Place) => p.filters.cocukUygun == filter.cocukUygun);
    }
    if (filter.cocukOyunAlani != null) {
      returnValue = returnValue.filter((p: Place) => p.filters.cocukOyunAlani == filter.cocukOyunAlani);
    }

    //Fiyat
    if (filter.fekonomik != null) {
      if (filter.fstandart != null) {
        if (filter.flux != null) {
          // e - s - l
          returnValue = returnValue.filter((p: Place) => p.filters.fekonomik == true || p.filters.fstandart == true || p.filters.flux == true);
        }
        else {
          // e - s
          returnValue = returnValue.filter((p: Place) => p.filters.fekonomik == true || p.filters.fstandart == true);
        }
      }
      else if (filter.flux != null) {
        // e - l
        returnValue = returnValue.filter((p: Place) => p.filters.fekonomik == true || p.filters.flux == true);
      }
      else {
        // e
        returnValue = returnValue.filter((p: Place) => p.filters.fekonomik == true);
      }
    }
    if (filter.fekonomik == null && filter.fstandart != null) {
      if (filter.flux != null) {
        // s - l
        returnValue = returnValue.filter((p: Place) => p.filters.fstandart == true || p.filters.flux == true);
      }
      else {
        // s
        returnValue = returnValue.filter((p: Place) => p.filters.fstandart);
      }
    }
    if (filter.fekonomik == null && filter.fstandart == null && filter.flux != null) {
      // l
      returnValue = returnValue.filter((p: Place) => p.filters.flux);
    }

    //Yogunluk
    if (filter.ysakin != null) {
      if (filter.ystandart != null) {
        if (filter.ykalabalik != null) {
          // sk - s - k
          returnValue = returnValue.filter((p: Place) => p.filters.ysakin == true || p.filters.ystandart == true || p.filters.ykalabalik == true);
        }
        else {
          // sk - s
          returnValue = returnValue.filter((p: Place) => p.filters.ysakin == true || p.filters.ystandart == true);
        }
      }
      else if (filter.ykalabalik != null) {
        // sk - k
        returnValue = returnValue.filter((p: Place) => p.filters.ysakin == true || p.filters.ykalabalik == true);
      }
      else {
        // sk
        returnValue = returnValue.filter((p: Place) => p.filters.ysakin);
      }
    }
    if (filter.ysakin == null && filter.ystandart != null) {
      if (filter.ykalabalik != null) {
        // s - k
        returnValue = returnValue.filter((p: Place) => p.filters.ystandart == true || p.filters.ykalabalik == true);
      }
      else {
        // s
        returnValue = returnValue.filter((p: Place) => p.filters.ystandart);
      }
    }
    if (filter.ysakin == null && filter.ystandart == null && filter.ykalabalik != null) {
      // k
      returnValue = returnValue.filter((p: Place) => p.filters.ykalabalik);
    }

    //Uygunluk
    if (filter.utoplanti != null) {
      if (filter.udans != null) {
        if (filter.usohbet != null) {
          if (filter.uders != null) {
            if (filter.uyemek != null) {
              if (filter.utatli != null) {
                if (filter.ukahvalti != null) {
                  // to - da - so - de - ye - ta - ka
                  returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
                } else {
                  // to - da - so - de - ye - ta
                  returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true);
                }
              } else if (filter.ukahvalti != null) {
                // to - da - so - de - ye - ka
                returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
              } else {
                // to - da - so - de - ye
                returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true);
              }
            } else if (filter.utatli != null) {
              if (filter.ukahvalti != null) {
                // to - da - so - de - ta - ka
                returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.utatli == true || p.filters.ukahvalti == true);
              } else {
                // to - da - so - de - ta
                returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.utatli == true);
              }
            } else if (filter.ukahvalti != null) {
              // to - da - so - de - ka
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.ukahvalti == true);
            } else {
              // to - da - so - de
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true);
            }
          } else if (filter.uyemek != null) {
            if (filter.utatli != null) {
              if (filter.ukahvalti != null) {
                // to - da - so - ye - ta - ka
                returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
              } else {
                // to - da - so - ye - ta
                returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.uyemek == true || p.filters.utatli == true);
              }
            } else if (filter.ukahvalti != null) {
              // to - da - so - ye - ka
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
            } else {
              // to - da - so - ye
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.uyemek == true);
            }
          } else if (filter.utatli != null) {
            if (filter.ukahvalti != null) {
              // to - da - so - ta - ka
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.utatli == true || p.filters.ukahvalti == true);
            } else {
              // to - da - so - ta
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.utatli == true);
            }
          } else if (filter.ukahvalti != null) {
            // to - da - so - ka
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true || p.filters.ukahvalti == true);
          } else {
            // to - da - so
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.usohbet == true);
          }
        } else if (filter.uders != null) {
          if (filter.uyemek != null) {
            if (filter.utatli != null) {
              if (filter.ukahvalti != null) {
                // to - da - de - ye - ta - ka
                returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);

              } else {
                // to - da - de - ye - ta
                returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true);
              }
            } else if (filter.ukahvalti != null) {
              // to - da - de - ye - ka
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
            } else {
              // to - da - de - ye
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.uders == true || p.filters.uyemek == true);
            }
          } else if (filter.utatli != null) {
            if (filter.ukahvalti != null) {
              // to - da - de - ta - ka
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.uders == true || p.filters.utatli == true || p.filters.ukahvalti == true);
            } else {
              // to - da - de - ta
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.uders == true || p.filters.utatli == true);
            }
          } else if (filter.ukahvalti != null) {
            // to - da - de - ka
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.uders == true || p.filters.ukahvalti == true);
          } else {
            // to - da - de
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.uders == true);
          }
        } else if (filter.uyemek != null) {
          if (filter.utatli != null) {
            if (filter.ukahvalti != null) {
              // to - da - ye - ta - ka
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
            } else {
              // to - da - ye - ta
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.uyemek == true || p.filters.utatli == true);
            }
          } else if (filter.ukahvalti != null) {
            // to - da - ye - ka
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
          } else {
            // to - da - ye
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.uyemek == true);
          }
        } else if (filter.utatli != null) {
          if (filter.ukahvalti != null) {
            // to - da - ta - ka
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.utatli == true || p.filters.ukahvalti == true);
          } else {
            // to - da - ta
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.utatli == true);
          }
        } else if (filter.ukahvalti != null) {
          // to - da - ka
          returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true || p.filters.ukahvalti == true);
        } else {
          // to - da
          returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.udans == true);
        }
      } else if (filter.usohbet != null) {
        if (filter.uders != null) {
          if (filter.uyemek != null) {
            if (filter.utatli != null) {
              if (filter.ukahvalti != null) {
                // to - so - de - ye - ta - ka
                returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
              } else {
                // to - so - de - ye - ta
                returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true);
              }
            } else if (filter.ukahvalti != null) {
              // to - so - de - ye - ka
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
            } else {
              // to - so - de - ye
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true);
            }
          } else if (filter.utatli != null) {
            if (filter.ukahvalti != null) {
              // to - so - de - ta - ka
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.utatli == true || p.filters.ukahvalti == true);
            } else {
              // to - so - de - ta
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.utatli == true);
            }
          } else if (filter.ukahvalti != null) {
            // to - so - de - ka
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.ukahvalti == true);
          } else {
            // to - so - de
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.uders == true);
          }
        } else if (filter.uyemek != null) {
          if (filter.utatli != null) {
            if (filter.ukahvalti != null) {
              // to - so - ye - ta - ka
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
            } else {
              // to - so - ye - ta
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.uyemek == true || p.filters.utatli == true);
            }
          } else if (filter.ukahvalti != null) {
            // to - so - ye - ka
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
          } else {
            // to - so - ye
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.uyemek == true);
          }
        } else if (filter.utatli != null) {
          if (filter.ukahvalti != null) {
            // to - so - ta - ka
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.utatli == true || p.filters.ukahvalti == true);
          } else {
            // to - so - ta
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.utatli == true);
          }
        } else if (filter.ukahvalti != null) {
          // to - so - ka
          returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true || p.filters.ukahvalti == true);
        } else {
          // to - so
          returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.usohbet == true);
        }
      } else if (filter.uders != null) {
        if (filter.uyemek != null) {
          if (filter.utatli != null) {
            if (filter.ukahvalti != null) {
              // to - de - ye - ta - ka
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
            } else {
              // to - de - ye - ta
              returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true);
            }
          } else if (filter.ukahvalti != null) {
            // to - de - ye - ka
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
          } else {
            // to - de - ye
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.uders == true || p.filters.uyemek == true);
          }
        } else if (filter.utatli != null) {
          if (filter.ukahvalti != null) {
            // to - de - ta - ka
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.uders == true || p.filters.utatli == true || p.filters.ukahvalti == true);
          } else {
            // to - de - ta
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.uders == true || p.filters.utatli == true);
          }
        } else if (filter.ukahvalti != null) {
          // to - de - ka
          returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.uders == true || p.filters.ukahvalti == true);
        } else {
          // to - de
          returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.uders == true);
        }
      } else if (filter.uyemek != null) {
        if (filter.utatli != null) {
          if (filter.ukahvalti != null) {
            // to - ye - ta - ka
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
          } else {
            // to - ye - ta
            returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.uyemek == true || p.filters.utatli == true);
          }
        } else if (filter.ukahvalti != null) {
          // to - ye - ka
          returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
        } else {
          // to - ye
          returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.uyemek == true);
        }
      } else if (filter.utatli != null) {
        if (filter.ukahvalti != null) {
          // to - ta - ka
          returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.utatli == true || p.filters.ukahvalti == true);
        } else {
          // to - ta
          returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.utatli == true);
        }
      } else if (filter.ukahvalti != null) {
        // to - ka
        returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true || p.filters.ukahvalti == true);
      } else {
        // to
        returnValue = returnValue.filter((p: Place) => p.filters.utoplanti == true);
      }
      // tosuz ---------------------------
    } else if (filter.udans != null) {
      if (filter.usohbet != null) {
        if (filter.uders != null) {
          if (filter.uyemek != null) {
            if (filter.utatli != null) {
              if (filter.ukahvalti != null) {
                // da - so - de - ye - ta - ka
                returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
              } else {
                // da - so - de - ye - ta
                returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true);
              }
            } else if (filter.ukahvalti != null) {
              // da - so - de - ye - ka
              returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
            } else {
              // da - so - de - ye
              returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true);
            }
          } else if (filter.utatli != null) {
            if (filter.ukahvalti != null) {
              // da - so - de - ta - ka
              returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true);
            } else {
              // da - so - de - ta
              returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.utatli == true);
            }
          } else if (filter.ukahvalti != null) {
            // da - so - de - ka
            returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true || p.filters.ukahvalti == true);
          } else {
            // da - so - de
            returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.uders == true);
          }
        } else if (filter.uyemek != null) {
          if (filter.utatli != null) {
            if (filter.ukahvalti != null) {
              // da - so - ye - ta - ka
              returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);

            } else {
              // da - so - ye - ta
              returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.uyemek == true || p.filters.utatli == true);
            }
          } else if (filter.ukahvalti != null) {
            // da - so - ye - ka
            returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
          } else {
            // da - so - ye
            returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.uyemek == true);
          }
        } else if (filter.utatli != null) {
          if (filter.ukahvalti != null) {
            // da - so - ta - ka
            returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.utatli == true || p.filters.ukahvalti == true);
          } else {
            // da - so - ta
            returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.utatli == true);
          }
        } else if (filter.ukahvalti != null) {
          // da - so - ka
          returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true || p.filters.ukahvalti == true);
        } else {
          // da - so
          returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.usohbet == true);
        }
      } else if (filter.uders != null) {
        if (filter.uyemek != null) {
          if (filter.utatli != null) {
            if (filter.ukahvalti != null) {
              // da - de - ye - ta - ka
              returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
            } else {
              // da - de - ye - ta
              returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true);
            }
          } else if (filter.ukahvalti != null) {
            // da - de - ye - ka
            returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
          } else {
            // da - de - ye
            returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.uders == true || p.filters.uyemek == true);
          }
        } else if (filter.utatli != null) {
          if (filter.ukahvalti != null) {
            // da - de - ta - ka
            returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.uders == true || p.filters.utatli == true || p.filters.ukahvalti == true);
          } else {
            // da - de - ta
            returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.uders == true || p.filters.utatli == true);
          }
        } else if (filter.ukahvalti != null) {
          // da - de - ka
          returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.uders == true || p.filters.ukahvalti == true);
        } else {
          // da - de
          returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.uders == true);
        }
      } else if (filter.uyemek != null) {
        if (filter.utatli != null) {
          if (filter.ukahvalti != null) {
            // da - ye - ta - ka
            returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
          } else {
            // da - ye - ta
            returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.uyemek == true || p.filters.utatli == true);
          }
        } else if (filter.ukahvalti != null) {
          // da - ye - ka
          returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
        } else {
          // da - ye
          returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.uyemek == true);
        }
      } else if (filter.utatli != null) {
        if (filter.ukahvalti != null) {
          // da - ta - ka
          returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.utatli == true || p.filters.ukahvalti == true);
        } else {
          // da - ta
          returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.utatli == true);
        }
      } else if (filter.ukahvalti != null) {
        // da - ka
        returnValue = returnValue.filter((p: Place) => p.filters.udans == true || p.filters.ukahvalti == true);
      } else {
        // da
        returnValue = returnValue.filter((p: Place) => p.filters.udans == true);
      }
    } else if (filter.usohbet != null) {
      if (filter.uders != null) {
        if (filter.uyemek != null) {
          if (filter.utatli != null) {
            if (filter.ukahvalti != null) {
              // so - de - ye - ta - ka
              returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
            } else {
              // so - de - ye - ta
              returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true);
            }
          } else if (filter.ukahvalti != null) {
            // so - de - ye - ka
            returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
          } else {
            // so - de - ye
            returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.uders == true || p.filters.uyemek == true);
          }
        } else if (filter.utatli != null) {
          if (filter.ukahvalti != null) {
            // so - de - ta - ka
            returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.uders == true || p.filters.utatli == true || p.filters.ukahvalti == true);
          } else {
            // so - de - ta
            returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.uders == true || p.filters.utatli == true);
          }
        } else if (filter.ukahvalti != null) {
          // so - de - ka
          returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.uders == true || p.filters.ukahvalti == true);
        } else {
          // so - de
          returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.uders == true);
        }
      } else if (filter.uyemek != null) {
        if (filter.utatli != null) {
          if (filter.ukahvalti != null) {
            // so - ye - ta - ka
            returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
          } else {
            // so - ye - ta
            returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.uyemek == true || p.filters.utatli == true);
          }
        } else if (filter.ukahvalti != null) {
          // so - ye - ka
          returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
        } else {
          // so - ye
          returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.uyemek == true);
        }
      } else if (filter.utatli != null) {
        if (filter.ukahvalti != null) {
          // so - ta - ka
          returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.utatli == true || p.filters.ukahvalti == true);
        } else {
          // so - ta
          returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.utatli == true);
        }
      } else if (filter.ukahvalti != null) {
        // so - ka
        returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true || p.filters.ukahvalti == true);
      } else {
        // so
        returnValue = returnValue.filter((p: Place) => p.filters.usohbet == true);
      }
    } else if (filter.uders != null) {
      if (filter.uyemek != null) {
        if (filter.utatli != null) {
          if (filter.ukahvalti != null) {
            // de - ye - ta - ka
            returnValue = returnValue.filter((p: Place) => p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
          } else {
            // de - ye - ta
            returnValue = returnValue.filter((p: Place) => p.filters.uders == true || p.filters.uyemek == true || p.filters.utatli == true);
          }
        } else if (filter.ukahvalti != null) {
          // de - ye - ka
          returnValue = returnValue.filter((p: Place) => p.filters.uders == true || p.filters.uyemek == true || p.filters.ukahvalti == true);
        } else {
          // de - ye
          returnValue = returnValue.filter((p: Place) => p.filters.uders == true || p.filters.uyemek == true);
        }
      } else if (filter.utatli != null) {
        if (filter.ukahvalti != null) {
          // de - ta - ka
          returnValue = returnValue.filter((p: Place) => p.filters.uders == true || p.filters.utatli == true || p.filters.ukahvalti == true);
        } else {
          // de - ta
          returnValue = returnValue.filter((p: Place) => p.filters.uders == true || p.filters.utatli == true);
        }
      } else if (filter.ukahvalti != null) {
        // de - ka
        returnValue = returnValue.filter((p: Place) => p.filters.uders == true || p.filters.ukahvalti == true);
      } else {
        // de
        returnValue = returnValue.filter((p: Place) => p.filters.uders == true);
      }
    } else if (filter.uyemek != null) {
      if (filter.utatli != null) {
        if (filter.ukahvalti != null) {
          // ye - ta - ka
          returnValue = returnValue.filter((p: Place) => p.filters.uyemek == true || p.filters.utatli == true || p.filters.ukahvalti == true);
        } else {
          // ye - ta
          returnValue = returnValue.filter((p: Place) => p.filters.uyemek == true || p.filters.utatli == true);
        }
      } else if (filter.ukahvalti != null) {
        // ye - ka
        returnValue = returnValue.filter((p: Place) => p.filters.uyemek == true || p.filters.ukahvalti == true);
      } else {
        // ye
        returnValue = returnValue.filter((p: Place) => p.filters.uyemek == true);
      }
    } else if (filter.utatli != null) {
      if (filter.ukahvalti != null) {
        // ta - ka
        returnValue = returnValue.filter((p: Place) => p.filters.utatli == true || p.filters.ukahvalti == true);
      } else {
        // ta
        returnValue = returnValue.filter((p: Place) => p.filters.utatli == true);
      }
    } else if (filter.ukahvalti != null) {
      // ka
      returnValue = returnValue.filter((p: Place) => p.filters.ukahvalti == true);
    }

    //Servis türü
    if (filter.sself != null) {
      if (filter.sgarson != null) {
        if (filter.stake != null) {
          // s - g - t
          returnValue = returnValue.filter((p: Place) => p.filters.sself == true || p.filters.sgarson == true || p.filters.stake == true);
        }
        else {
          // s - g
          returnValue = returnValue.filter((p: Place) => p.filters.sself == true || p.filters.sgarson == true);
        }
      }
      else if (filter.stake != null) {
        // s - t
        returnValue = returnValue.filter((p: Place) => p.filters.sself == true || p.filters.stake == true);
      }
      else {
        // s
        returnValue = returnValue.filter((p: Place) => p.filters.sself);
      }
    }
    if (filter.sself == null && filter.sgarson != null) {
      if (filter.stake != null) {
        // g - t
        returnValue = returnValue.filter((p: Place) => p.filters.sgarson == true || p.filters.stake == true);
      }
      else {
        // g
        returnValue = returnValue.filter((p: Place) => p.filters.sgarson);
      }
    }
    if (filter.sself == null && filter.sgarson == null && filter.stake != null) {
      // t
      returnValue = returnValue.filter((p: Place) => p.filters.stake);
    }

    //TODO
    //Müzik türü
    if (filter.mrap != null) {
      if (filter.mrock != null) {
        if (filter.mpop != null) {
          if (filter.mhiphop != null) {
            if (filter.mklasik != null) {
              if (filter.mnostaji != null) {
                if (filter.myerli != null) {
                  if (filter.myabanci != null) {
                    // ra - ro - po - hi - kl - no - ye - ya
                    returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
                  }
                  else {
                    // ra - ro - po - hi - kl - no - ye
                    returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
                  }
                } else if (filter.myabanci != null) {
                  // ra - ro - po - hi - kl - no - ya
                  returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
                }
                else {
                  // ra - ro - po - hi - kl - no
                  returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true);
                }
              } else if (filter.myerli != null) {
                if (filter.myabanci != null) {
                  // ra - ro - po - hi - kl - ye - ya
                  returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
                }
                else {
                  // ra - ro - po - hi - kl - ye
                  returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true);
                }
              } else if (filter.myabanci != null) {
                // ra - ro - po - hi - kl - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myabanci == true);
              }
              else {
                // ra - ro - po - hi - kl
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true);
              }
            } else if (filter.mnostaji != null) {
              if (filter.myerli != null) {
                if (filter.myabanci != null) {
                  // ra - ro - po - hi - no - ye - ya
                  returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
                }
                else {
                  // ra - ro - po - hi - no - ye
                  returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true);
                }
              } else if (filter.myabanci != null) {
                // ra - ro - po - hi - no - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myabanci == true);
              }
              else {
                // ra - ro - po - hi - no
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true);
              }
            } else if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ra - ro - po - hi - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ra - ro - po - hi - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ra - ro - po - hi - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.myabanci == true);
            }
            else {
              // ra - ro - po - hi
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true);
            }
          }else if (filter.mklasik != null) {
            if (filter.mnostaji != null) {
              if (filter.myerli != null) {
                if (filter.myabanci != null) {
                  // ra - ro - po - kl - no - ye - ya
                  returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
                }
                else {
                  // ra - ro - po - kl - no - ye
                  returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
                }
              } else if (filter.myabanci != null) {
                // ra - ro - po - kl - no - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
              }
              else {
                // ra - ro - po - kl - no
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true);
              }
            } else if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ra - ro - po - kl - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ra - ro - po - kl - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ra - ro - po - kl - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.myabanci == true);
            }
            else {
              // ra - ro - po - kl
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true);
            }
          } else if (filter.mnostaji != null) {
            if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ra - ro - po - no - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ra - ro - po - no - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mnostaji == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ra - ro - po - no - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mnostaji == true || p.filters.myabanci == true);
            }
            else {
              // ra - ro - po - no
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.mnostaji == true);
            }
          } else if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ra - ro - po - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ra - ro - po - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ra - ro - po - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true || p.filters.myabanci == true);
          }
          else {
            // ra - ro - po
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mpop == true);
          }
        }else if (filter.mhiphop != null) {
          if (filter.mklasik != null) {
            if (filter.mnostaji != null) {
              if (filter.myerli != null) {
                if (filter.myabanci != null) {
                  // ra - ro - hi - kl - no - ye - ya
                  returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
                }
                else {
                  // ra - ro - hi - kl - no - ye
                  returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
                }
              } else if (filter.myabanci != null) {
                // ra - ro - hi - kl - no - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
              }
              else {
                // ra - ro - hi - kl - no
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true);
              }
            } else if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ra - ro - hi - kl - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ra - ro - hi - kl - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ra - ro - hi - kl - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myabanci == true);
            }
            else {
              // ra - ro - hi - kl
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true);
            }
          } else if (filter.mnostaji != null) {
            if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ra - ro - hi - no - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ra - ro - hi - no - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ra - ro - hi - no - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myabanci == true);
            }
            else {
              // ra - ro - hi - no
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mnostaji == true);
            }
          } else if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ra - ro - hi - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ra - ro - hi - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ra - ro - hi - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true || p.filters.myabanci == true);
          }
          else {
            // ra - ro - hi
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mhiphop == true);
          }
        }else if (filter.mklasik != null) {
          if (filter.mnostaji != null) {
            if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ra - ro - kl - no - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ra - ro - kl - no - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ra - ro - kl - no - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
            }
            else {
              // ra - ro - kl - no
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mklasik == true || p.filters.mnostaji == true);
            }
          } else if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ra - ro - kl - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ra - ro - kl - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mklasik == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ra - ro - kl - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mklasik == true || p.filters.myabanci == true);
          }
          else {
            // ra - ro - kl
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mklasik == true);
          }
        } else if (filter.mnostaji != null) {
          if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ra - ro - no - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ra - ro - no - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mnostaji == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ra - ro - no - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mnostaji == true || p.filters.myabanci == true);
          }
          else {
            // ra - ro - no
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.mnostaji == true);
          }
        } else if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // ra - ro - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // ra - ro - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // ra - ro - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true || p.filters.myabanci == true);
        }
        else {
          // ra - ro
          returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mrock == true);
        }
      }else if (filter.mpop != null) {
        if (filter.mhiphop != null) {
          if (filter.mklasik != null) {
            if (filter.mnostaji != null) {
              if (filter.myerli != null) {
                if (filter.myabanci != null) {
                  // ra - po - hi - kl - no - ye - ya
                  returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
                }
                else {
                  // ra - po - hi - kl - no - ye
                  returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
                }
              } else if (filter.myabanci != null) {
                // ra - po - hi - kl - no - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
              }
              else {
                // ra - po - hi - kl - no
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true);
              }
            } else if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ra - po - hi - kl - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ra - po - hi - kl - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ra - po - hi - kl - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myabanci == true);
            }
            else {
              // ra - po - hi - kl
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true);
            }
          } else if (filter.mnostaji != null) {
            if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ra - po - hi - no - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ra - po - hi - no - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ra - po - hi - no - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myabanci == true);
            }
            else {
              // ra - po - hi - no
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true);
            }
          } else if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ra - po - hi - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ra - po - hi - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ra - po - hi - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.myabanci == true);
          }
          else {
            // ra - po - hi
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mhiphop == true);
          }
        }else if (filter.mklasik != null) {
          if (filter.mnostaji != null) {
            if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ra - po - kl - no - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ra - po - kl - no - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ra - po - kl - no - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
            }
            else {
              // ra - po - kl - no
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true);
            }
          } else if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ra - po - kl - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ra - po - kl - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ra - po - kl - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.myabanci == true);
          }
          else {
            // ra - po - kl
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mklasik == true);
          }
        } else if (filter.mnostaji != null) {
          if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ra - po - no - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ra - po - no - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mnostaji == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ra - po - no - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mnostaji == true || p.filters.myabanci == true);
          }
          else {
            // ra - po - no
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.mnostaji);
          }
        } else if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // ra - po - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // ra - po - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // ra - po - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true || p.filters.myabanci == true);
        }
        else {
          // ra - po
          returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mpop == true);
        }
      }else if (filter.mhiphop != null) {
        if (filter.mklasik != null) {
          if (filter.mnostaji != null) {
            if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ra - hi - kl - no - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ra - hi - kl - no - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ra - hi - kl - no - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
            }
            else {
              // ra - hi - kl - no
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true);
            }
          } else if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ra - hi - kl - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ra - hi - kl - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ra - hi - kl - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myabanci == true);
          }
          else {
            // ra - hi - kl
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.mklasik == true);
          }
        } else if (filter.mnostaji != null) {
          if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ra - hi - no - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ra - hi - no - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ra - hi - no - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myabanci == true);
          }
          else {
            // ra - hi - no
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.mnostaji == true);
          }
        } else if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // ra - hi - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // ra - hi - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // ra - hi - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true || p.filters.myabanci == true);
        }
        else {
          // ra - hi
          returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mhiphop == true);
        }
      }else if (filter.mklasik != null) {
        if (filter.mnostaji != null) {
          if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ra - kl - no - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ra - kl - no - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ra - kl - no - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
          }
          else {
            // ra - kl - no
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mklasik == true || p.filters.mnostaji == true);
          }
        } else if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // ra - kl - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // ra - kl - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mklasik == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // ra - kl - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mklasik == true || p.filters.myabanci == true);
        }
        else {
          // ra - kl
          returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mklasik == true);
        }
      } else if (filter.mnostaji != null) {
        if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // ra - no - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // ra - no - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mnostaji == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // ra - no - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mnostaji == true || p.filters.myabanci == true);
        }
        else {
          // ra - no
          returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.mnostaji == true);
        }
      } else if (filter.myerli != null) {
        if (filter.myabanci != null) {
          // ra - ye - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.myerli == true || p.filters.myabanci == true);
        }
        else {
          // ra - ye
          returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.myerli == true);
        }
      } else if (filter.myabanci != null) {
        // ra - ya
        returnValue = returnValue.filter((p: Place) => p.filters.mrap == true || p.filters.myabanci == true);
      }
      else {
        // ra
        returnValue = returnValue.filter((p: Place) => p.filters.mrap == true);
      }
    }else if (filter.mrock != null) {
      if (filter.mpop != null) {
        if (filter.mhiphop != null) {
          if (filter.mklasik != null) {
            if (filter.mnostaji != null) {
              if (filter.myerli != null) {
                if (filter.myabanci != null) {
                  // ro - po - hi - kl - no - ye - ya
                  returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
                }
                else {
                  // ro - po - hi - kl - no - ye
                  returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
                }
              } else if (filter.myabanci != null) {
                // ro - po - hi - kl - no - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
              }
              else {
                // ro - po - hi - kl - no
                returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true);
              }
            } else if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ro - po - hi - kl - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ro - po - hi - kl - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ro - po - hi - kl - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myabanci == true);
            }
            else {
              // ro - po - hi - kl
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true);
            }
          } else if (filter.mnostaji != null) {
            if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ro - po - hi - no - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ro - po - hi - no - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ro - po - hi - no - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myabanci == true);
            }
            else {
              // ro - po - hi - no
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true);
            }
          } else if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ro - po - hi - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ro - po - hi - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ro - po - hi - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true || p.filters.myabanci == true);
          }
          else {
            // ro - po - hi
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mhiphop == true);
          }
        }else if (filter.mklasik != null) {
          if (filter.mnostaji != null) {
            if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ro - po - kl - no - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ro - po - kl - no - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ro - po - kl - no - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
            }
            else {
              // ro - po - kl - no
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true);
            }
          } else if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ro - po - kl - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ro - po - kl - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ro - po - kl - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true || p.filters.myabanci == true);
          }
          else {
            // ro - po - kl
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mklasik == true);
          }
        } else if (filter.mnostaji != null) {
          if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ro - po - no - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ro - po - no - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mnostaji == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ro - po - no - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mnostaji == true || p.filters.myabanci == true);
          }
          else {
            // ro - po - no
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.mnostaji == true);
          }
        } else if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // ro - po - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // ro - po - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // ro - po - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true || p.filters.myabanci == true);
        }
        else {
          // ro - po
          returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mpop == true);
        }
      }else if (filter.mhiphop != null) {
        if (filter.mklasik != null) {
          if (filter.mnostaji != null) {
            if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // ro - hi - kl - no - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // ro - hi - kl - no - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // ro - hi - kl - no - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
            }
            else {
              // ro - hi - kl - no
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true);
            }
          } else if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ro - hi - kl - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ro - hi - kl - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ro - hi - kl - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myabanci == true);
          }
          else {
            // ro - hi - kl
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mklasik == true);
          }
        } else if (filter.mnostaji != null) {
          if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ro - hi - no - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ro - hi - no - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ro - hi - no - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myabanci == true);
          }
          else {
            // ro - hi - no
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.mnostaji == true);
          }
        } else if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // ro - hi - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // ro - hi - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // ro - hi - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true || p.filters.myabanci == true);
        }
        else {
          // ro - hi
          returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mhiphop == true);
        }
      }else if (filter.mklasik != null) {
        if (filter.mnostaji != null) {
          if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // ro - kl - no - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // ro - kl - no - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // ro - kl - no - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
          }
          else {
            // ro - kl - no
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mklasik == true || p.filters.mnostaji == true);
          }
        } else if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // ro - kl - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // ro - kl - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mklasik == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // ro - kl - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mklasik == true || p.filters.myabanci == true);
        }
        else {
          // ro - kl
          returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mklasik == true);
        }
      } else if (filter.mnostaji != null) {
        if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // ro - no - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // ro - no - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mnostaji == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // ro - no - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mnostaji == true || p.filters.myabanci == true);
        }
        else {
          // ro - no
          returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.mnostaji == true);
        }
      } else if (filter.myerli != null) {
        if (filter.myabanci != null) {
          // ro - ye - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.myerli == true || p.filters.myabanci == true);
        }
        else {
          // ro - ye
          returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.myerli == true);
        }
      } else if (filter.myabanci != null) {
        // ro - ya
        returnValue = returnValue.filter((p: Place) => p.filters.mrock == true || p.filters.myabanci == true);
      }
      else {
        // ro
        returnValue = returnValue.filter((p: Place) => p.filters.mrock == true);
      }
    }else if (filter.mpop != null) {
      if (filter.mhiphop != null) {
        if (filter.mklasik != null) {
          if (filter.mnostaji != null) {
            if (filter.myerli != null) {
              if (filter.myabanci != null) {
                // po - hi - kl - no - ye - ya
                returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
              }
              else {
                // po - hi - kl - no - ye
                returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
              }
            } else if (filter.myabanci != null) {
              // po - hi - kl - no - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
            }
            else {
              // po - hi - kl - no
              returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true);
            }
          } else if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // po - hi - kl - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // po - hi - kl - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // po - hi - kl - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myabanci == true);
          }
          else {
            // po - hi - kl
            returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mklasik == true);
          }
        } else if (filter.mnostaji != null) {
          if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // po - hi - no - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // po - hi - no - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // po - hi - no - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myabanci == true);
          }
          else {
            // po - hi - no
            returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.mnostaji == true);
          }
        } else if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // po - hi - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // po - hi - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // po - hi - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true || p.filters.myabanci == true);
        }
        else {
          // po - hi
          returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mhiphop == true);
        }
      }else if (filter.mklasik != null) {
        if (filter.mnostaji != null) {
          if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // po - kl - no - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // po - kl - no - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // po - kl - no - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
          }
          else {
            // po - kl - no
            returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mklasik == true || p.filters.mnostaji == true);
          }
        } else if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // po - kl - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // po - kl - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mklasik == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // po - kl - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mklasik == true || p.filters.myabanci == true);
        }
        else {
          // po - kl
          returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mklasik == true);
        }
      } else if (filter.mnostaji != null) {
        if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // po - no - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // po - no - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mnostaji == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // po - no - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mnostaji == true || p.filters.myabanci == true);
        }
        else {
          // po - no
          returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.mnostaji == true);
        }
      } else if (filter.myerli != null) {
        if (filter.myabanci != null) {
          // po - ye - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.myerli == true || p.filters.myabanci == true);
        }
        else {
          // po - ye
          returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.myerli == true);
        }
      } else if (filter.myabanci != null) {
        // po - ya
        returnValue = returnValue.filter((p: Place) => p.filters.mpop == true || p.filters.myabanci == true);
      }
      else {
        // po
        returnValue = returnValue.filter((p: Place) => p.filters.mpop == true);
      }
    }else if (filter.mhiphop != null) {
      if (filter.mklasik != null) {
        if (filter.mnostaji != null) {
          if (filter.myerli != null) {
            if (filter.myabanci != null) {
              // hi - kl - no - ye - ya
              returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
            }
            else {
              // hi - kl - no - ye
              returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
            }
          } else if (filter.myabanci != null) {
            // hi - kl - no - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
          }
          else {
            // hi - kl - no
            returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.mnostaji == true);
          }
        } else if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // hi - kl - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // hi - kl - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // hi - kl - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.mklasik == true || p.filters.myabanci == true);
        }
        else {
          // hi - kl
          returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.mklasik == true);
        }
      } else if (filter.mnostaji != null) {
        if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // hi - no - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // hi - no - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // hi - no - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.mnostaji == true || p.filters.myabanci == true);
        }
        else {
          // hi - no
          returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.mnostaji == true);
        }
      } else if (filter.myerli != null) {
        if (filter.myabanci != null) {
          // hi - ye - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.myerli == true || p.filters.myabanci == true);
        }
        else {
          // hi - ye
          returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.myerli == true);
        }
      } else if (filter.myabanci != null) {
        // hi - ya
        returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true || p.filters.myabanci == true);
      }
      else {
        // hi
        returnValue = returnValue.filter((p: Place) => p.filters.mhiphop == true);
      }
    }else if (filter.mklasik != null) {
      if (filter.mnostaji != null) {
        if (filter.myerli != null) {
          if (filter.myabanci != null) {
            // kl - no - ye - ya
            returnValue = returnValue.filter((p: Place) => p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
          }
          else {
            // kl - no - ye
            returnValue = returnValue.filter((p: Place) => p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myerli == true);
          }
        } else if (filter.myabanci != null) {
          // kl - no - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mklasik == true || p.filters.mnostaji == true || p.filters.myabanci == true);
        }
        else {
          // kl - no
          returnValue = returnValue.filter((p: Place) => p.filters.mklasik == true || p.filters.mnostaji == true);
        }
      } else if (filter.myerli != null) {
        if (filter.myabanci != null) {
          // kl - ye - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mklasik == true || p.filters.myerli == true || p.filters.myabanci == true);
        }
        else {
          // kl - ye
          returnValue = returnValue.filter((p: Place) => p.filters.mklasik == true || p.filters.myerli == true);
        }
      } else if (filter.myabanci != null) {
        // kl - ya
        returnValue = returnValue.filter((p: Place) => p.filters.mklasik == true || p.filters.myabanci == true);
      }
      else {
        // kl
        returnValue = returnValue.filter((p: Place) => p.filters.mklasik == true);
      }
    } else if (filter.mnostaji != null) {
      if (filter.myerli != null) {
        if (filter.myabanci != null) {
          // no - ye - ya
          returnValue = returnValue.filter((p: Place) => p.filters.mnostaji == true || p.filters.myerli == true || p.filters.myabanci == true);
        }
        else {
          // no - ye
          returnValue = returnValue.filter((p: Place) => p.filters.mnostaji == true || p.filters.myerli == true);
        }
      } else if (filter.myabanci != null) {
        // no - ya
        returnValue = returnValue.filter((p: Place) => p.filters.mnostaji == true || p.filters.myabanci == true);
      }
      else {
        // no
        returnValue = returnValue.filter((p: Place) => p.filters.mnostaji == true);
      }
    } else if (filter.myerli != null) {
      if (filter.myabanci != null) {
        // ye - ya
        returnValue = returnValue.filter((p: Place) => p.filters.myerli == true || p.filters.myabanci == true);
      }
      else {
        // ye
        returnValue = returnValue.filter((p: Place) => p.filters.myerli == true);
      }
    } else if (filter.myabanci != null) {
      // ya
      returnValue = returnValue.filter((p: Place) => p.filters.myabanci == true);
    }

    //Tasarım türü
    if (filter.tmodern != null) {
      if (filter.tvintage != null) {
        if (filter.tsalas != null) {
          if (filter.totantik != null) {
            if (filter.tbutik != null) {
              if (filter.tkitap != null) {
                //  m - v - s - o - b - k
                returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.tsalas == true || p.filters.totantik == true || p.filters.tbutik == true || p.filters.tkitap == true);
              } else {
                //  m - v - s - o - b
                returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.tsalas == true || p.filters.totantik == true || p.filters.tbutik == true);
              }
            } else if (filter.tkitap != null) {
              //  m - v - s - o - k
              returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.tsalas == true || p.filters.totantik == true || p.filters.tkitap == true);
            } else {
              //  m - v - s - o
              returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.tsalas == true || p.filters.totantik == true);
            }
          } else if (filter.tbutik != null) {
            if (filter.tkitap != null) {
              //  m - v - s - b - k
              returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.tsalas == true || p.filters.tbutik == true || p.filters.tkitap == true);
            } else {
              //  m - v - s - b
              returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.tsalas == true || p.filters.tbutik == true);
            }
          } else if (filter.tkitap != null) {
            //  m - v - s - k
            returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.tsalas == true || p.filters.tkitap == true);
          } else {
            //  m - v - s
            returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.tsalas == true);
          }
        } else if (filter.totantik != null) {
          if (filter.tbutik != null) {
            if (filter.tkitap != null) {
              //  m - v - o - b - k
              returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.totantik == true || p.filters.tbutik == true || p.filters.tkitap == true);
            } else {
              //  m - v - o - b
              returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.totantik == true || p.filters.tbutik == true);
            }
          } else if (filter.tkitap != null) {
            //  m - v - o - k
            returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.totantik == true || p.filters.tkitap == true);
          } else {
            //  m - v - o
            returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.totantik == true);
          }
        } else if (filter.tbutik != null) {
          if (filter.tkitap != null) {
            //  m - v - b - k
            returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.tbutik == true || p.filters.tkitap == true);
          } else {
            //  m - v - b
            returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.tbutik == true);
          }
        } else if (filter.tkitap != null) {
          //  m - v - k
          returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true || p.filters.tkitap == true);
        } else {
          //  m - v
          returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tvintage == true);
        }
      } else if (filter.tsalas != null) {
        if (filter.totantik != null) {
          if (filter.tbutik != null) {
            if (filter.tkitap != null) {
              //  m - s - o - b - k
              returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tsalas == true || p.filters.totantik == true || p.filters.tbutik == true || p.filters.tkitap == true);
            } else {
              //  m - s - o - b
              returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tsalas == true || p.filters.totantik == true || p.filters.tbutik == true);
            }
          } else if (filter.tkitap != null) {
            //  m - s - o - k
            returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tsalas == true || p.filters.totantik == true || p.filters.tkitap == true);
          } else {
            //  m - s - o
            returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tsalas == true || p.filters.totantik == true);
          }
        } else if (filter.tbutik != null) {
          if (filter.tkitap != null) {
            //  m - s - b - k
            returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tsalas == true || p.filters.tbutik == true || p.filters.tkitap == true);
          } else {
            //  m - s - b
            returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tsalas == true || p.filters.tbutik == true);
          }
        } else if (filter.tkitap != null) {
          //  m - s - k
          returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tsalas == true || p.filters.tkitap == true);
        } else {
          //  m - s
          returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tsalas == true);
        }
      } else if (filter.totantik != null) {
        if (filter.tbutik != null) {
          if (filter.tkitap != null) {
            //  m - o - b - k
            returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.totantik == true || p.filters.tbutik == true || p.filters.tkitap == true);
          } else {
            //  m - o - b
            returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.totantik == true || p.filters.tbutik == true);
          }
        } else if (filter.tkitap != null) {
          //  m - o - k
          returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.totantik == true || p.filters.tkitap == true);
        } else {
          //  m - o
          returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.totantik == true);
        }
      } else if (filter.tbutik != null) {
        if (filter.tkitap != null) {
          //  m - b - k
          returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tbutik == true || p.filters.tkitap == true);
        } else {
          //  m - b
          returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tbutik == true);
        }
      } else if (filter.tkitap != null) {
        //  m - k
        returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true || p.filters.tkitap == true);
      } else {
        //  m
        returnValue = returnValue.filter((p: Place) => p.filters.tmodern == true);
      }
    } else if (filter.tvintage != null) {
      if (filter.tsalas != null) {
        if (filter.totantik != null) {
          if (filter.tbutik != null) {
            if (filter.tkitap != null) {
              //  v - s - o - b - k
              returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.tsalas == true || p.filters.totantik == true || p.filters.tbutik == true || p.filters.tkitap == true);
            } else {
              // v - s - o - b
              returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.tsalas == true || p.filters.totantik == true || p.filters.tbutik == true);
            }
          } else if (filter.tkitap != null) {
            // v - s - o - k
            returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.tsalas == true || p.filters.totantik == true || p.filters.tkitap == true);
          } else {
            // v - s - o
            returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.tsalas == true || p.filters.totantik == true);
          }
        } else if (filter.tbutik != null) {
          if (filter.tkitap != null) {
            // v - s - b - k
            returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.tsalas == true || p.filters.tbutik == true || p.filters.tkitap == true);
          } else {
            // v - s - b
            returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.tsalas == true || p.filters.tbutik == true);
          }
        } else if (filter.tkitap != null) {
          // v - s - k
          returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.tsalas == true || p.filters.tkitap == true);
        } else {
          // v - s
          returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.tsalas == true);
        }
      } else if (filter.totantik != null) {
        if (filter.tbutik != null) {
          if (filter.tkitap != null) {
            // v - o - b - k
            returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.totantik == true || p.filters.tbutik == true || p.filters.tkitap == true);
          } else {
            // v - o - b
            returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.totantik == true || p.filters.tbutik == true);
          }
        } else if (filter.tkitap != null) {
          // v - o - k
          returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.totantik == true || p.filters.tkitap == true);
        } else {
          // v - o
          returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.totantik == true);
        }
      } else if (filter.tbutik != null) {
        if (filter.tkitap != null) {
          // v - b - k
          returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.tbutik == true || p.filters.tkitap == true);
        } else {
          // v - b
          returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.tbutik == true);
        }
      } else if (filter.tkitap != null) {
        // v - k
        returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true || p.filters.tkitap == true);
      } else {
        // v
        returnValue = returnValue.filter((p: Place) => p.filters.tvintage == true);
      }
    } else if (filter.tsalas != null) {
      if (filter.totantik != null) {
        if (filter.tbutik != null) {
          if (filter.tkitap != null) {
            // s - o - b - k
            returnValue = returnValue.filter((p: Place) => p.filters.tsalas == true || p.filters.totantik == true || p.filters.tbutik == true || p.filters.tkitap == true);
          } else {
            // s - o - b
            returnValue = returnValue.filter((p: Place) => p.filters.tsalas == true || p.filters.totantik == true || p.filters.tbutik == true);
          }
        } else if (filter.tkitap != null) {
          // s - o - k
          returnValue = returnValue.filter((p: Place) => p.filters.tsalas == true || p.filters.totantik == true || p.filters.tkitap == true);
        } else {
          // s - o
          returnValue = returnValue.filter((p: Place) => p.filters.tsalas == true || p.filters.totantik == true);
        }
      } else if (filter.tbutik != null) {
        if (filter.tkitap != null) {
          // s - b - k
          returnValue = returnValue.filter((p: Place) => p.filters.tsalas == true || p.filters.tbutik == true || p.filters.tkitap == true);
        } else {
          // s - b
          returnValue = returnValue.filter((p: Place) => p.filters.tsalas == true || p.filters.tbutik == true);
        }
      } else if (filter.tkitap != null) {
        // s - k
        returnValue = returnValue.filter((p: Place) => p.filters.tsalas == true || p.filters.tkitap == true);
      } else {
        // s
        returnValue = returnValue.filter((p: Place) => p.filters.tsalas == true);
      }
    } else if (filter.totantik != null) {
      if (filter.tbutik != null) {
        if (filter.tkitap != null) {
          // o - b - k
          returnValue = returnValue.filter((p: Place) => p.filters.totantik == true || p.filters.tbutik == true || p.filters.tkitap == true);
        } else {
          // o - b
          returnValue = returnValue.filter((p: Place) => p.filters.totantik == true || p.filters.tbutik == true);
        }
      } else if (filter.tkitap != null) {
        // o - k
        returnValue = returnValue.filter((p: Place) => p.filters.totantik == true || p.filters.tkitap == true);
      } else {
        // o
        returnValue = returnValue.filter((p: Place) => p.filters.totantik == true);
      }
    } else if (filter.tbutik != null) {
      if (filter.tkitap != null) {
        // b - k
        returnValue = returnValue.filter((p: Place) => p.filters.tbutik == true || p.filters.tkitap == true);
      } else {
        // b
        returnValue = returnValue.filter((p: Place) => p.filters.tbutik == true);
      }
    } else if (filter.tkitap != null) {
      // k
      returnValue = returnValue.filter((p: Place) => p.filters.tkitap == true);
    }

    //Masa Türü
    if (filter.mmasa != null) {
      if (filter.mbistro != null) {
        if (filter.mayakta != null) {
          if (filter.mloca != null) {
            // m - b - a - l
            returnValue = returnValue.filter((p: Place) => p.filters.mmasa == true || p.filters.mbistro == true || p.filters.mayakta == true || p.filters.mloca == true);
          }
          else {
            // m - b - a
            returnValue = returnValue.filter((p: Place) => p.filters.mmasa == true || p.filters.mbistro == true || p.filters.mayakta == true);
          }
        }
        else if (filter.mloca != null) {
          // m - b - l
          returnValue = returnValue.filter((p: Place) => p.filters.mmasa == true || p.filters.mbistro == true || p.filters.mloca == true);
        }
        else {
          // m - b
          returnValue = returnValue.filter((p: Place) => p.filters.mmasa == true || p.filters.mbistro == true);
        }
      } else if (filter.mayakta != null) {
        if (filter.mloca != null) {
          // m - a - l
          returnValue = returnValue.filter((p: Place) => p.filters.mmasa == true || p.filters.mayakta == true || p.filters.mloca == true);
        } else {
          // m - a
          returnValue = returnValue.filter((p: Place) => p.filters.mmasa == true || p.filters.mayakta == true);
        }
      } else if (filter.mloca != null) {
        // m - l
        returnValue = returnValue.filter((p: Place) => p.filters.mmasa == true || p.filters.mloca == true);
      } else {
        // m
        returnValue = returnValue.filter((p: Place) => p.filters.mmasa == true);
      }
    } else if (filter.mbistro != null) {
      if (filter.mayakta != null) {
        if (filter.mloca != null) {
          // b - a - l
          returnValue = returnValue.filter((p: Place) => p.filters.mbistro == true || p.filters.mayakta == true || p.filters.mloca == true);
        } else {
          // b - a
          returnValue = returnValue.filter((p: Place) => p.filters.mbistro == true || p.filters.mayakta == true);
        }
      } else if (filter.mloca) {
        // b - l
        returnValue = returnValue.filter((p: Place) => p.filters.mbistro == true || p.filters.mloca == true);
      } else {
        // b
        returnValue = returnValue.filter((p: Place) => p.filters.mbistro == true);
      }
    } else if (filter.mayakta != null) {
      if (filter.mloca != null) {
        // a - l
        returnValue = returnValue.filter((p: Place) => p.filters.mayakta == true || p.filters.mloca == true);
      } else {
        // a
        returnValue = returnValue.filter((p: Place) => p.filters.mayakta == true);
      }
    } else if (filter.mloca != null) {
      // l
      returnValue = returnValue.filter((p: Place) => p.filters.mloca == true);
    }

    return returnValue;
  }

}

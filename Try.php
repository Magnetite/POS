
<?php

$managerPass = "orange322"; // TODO: Replace this with a call to a database

function TryC(){
try
            {
                // connect to database
                $handle = new PDO("mysql:dbname=" . "restaurant" . ";host=" . "localhost","root", "");
				// ensure that PDO::prepare returns false when passed invalid SQL
                $handle->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); 
				
				
				
				
				
				$table = "menu";
				
				
				if (isset($_GET['t']) ){
				
					$table = $_GET['t'];
				
				}
				
				
				
				if (isset($_GET['c']) ){
				
				if ($_GET['mp'] == $managerPass){
				
					Creater($table, $handle);
				}
					
					
					
					} else if(isset($_GET['P1']) ){
				
					
				   return Reader($table, $handle);
				
					
					
				} else if(isset($_GET['r1']) ){
				
					//All rows of table
					$query = "SELECT * FROM " . $_GET['t'] ;
				
					$stm = $handle->prepare($query);
				$stm->execute();
				
				$ros = $stm->fetchAll(PDO::FETCH_ASSOC);
				return $ros;
				
				
				
				
				} else if (isset($_GET['u']) or isset($_GET['u1']) ){
					
					Updater($table, $handle);
					
					
				} else if (isset($_GET['d'])){
				
					if ($_GET['mp'] == $managerPass){
					
						Deleter($table, $handle);
					} 
				    
				}
				
				
				//ReadMenu();
				//default value of $query
				$query = "select * from menu where in_stock > ?";
				
				$stmt = $handle->prepare($query);
				$stmt->execute([0]);
				
				
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
				return $rows;
				
                
            }
            catch (Exception $e)
            {
                // trigger (big, orange) error
                trigger_error($e->getMessage(), E_USER_ERROR);
                exit;
            }
			}
			
			
			
			
			function Creater($ta, $h){
			
				
				    $query = "INSERT INTO " . $ta . " VALUES ( " . $_GET['c'] . " );" ;
					
					Executer($h,$query);
					
			
			}
			
			function Reader($ta, $h){
			
					//Only certain rows of table
					$query = "SELECT * FROM " . $_GET["t"] . " WHERE " . $_GET["P1"] . " = " . $_GET['P2']; //changed 1-14-2017 TODO fIX Bug
					
					
					$st = $h->prepare($query);
				    $st->execute();
				
				
				   $rowz = $st->fetchAll(PDO::FETCH_ASSOC);
				   return $rowz ; 
			
			
			}
			
			
			function Updater($ta,$h){
			
			
			
			if (isset($_GET['u1']) && $_GET['mp'] == $managerPass ){
					
					
					
					
					
					
					
						
						$query = "UPDATE " . $_GET['t'] . " SET " . $_GET['u1'] . " = " . $_GET['u2'] . " WHERE id = " . $_GET['u3'] ;
						
						//Process $query
						Executer($h,$query);
						
					
					
					return 0;
					
					
				} else {
			
			
			
			
					//Turn string into an array, to easily update stock values
					$IdStk = explode("-", $_GET['u']); 
					
					//Iterate and update all values
					for($i = 0, $len = count($IdStk); $i < $len; $i += 2){
					
						
						$query = "UPDATE " . $ta . " SET in_stock=" . $IdStk[$i + 1] . " WHERE id=" . $IdStk[$i];
						
						//Process $query
						Executer($h,$query);
						
					}
					
					return 0;
					
						}
				
			
			}
			
			
			function Deleter($ta, $h){
				
					$n = "name";
					if ( isset($_GET['ds']) ){ $n = $_GET['ds'];}
				
					
					$query = "DELETE FROM " . $ta . " WHERE " . $n . "=" . $_GET['d'];
					
					Executer($h,$query);
							
				}
				
			
			function UpdateColumn( $ta, $h, $name, $colArr){
			
			
			for ($i = 0, $len = count($colArr); $i < $len; $i++){
			
				$query = "UPDATE " . $ta . " SET " . $name . " = " . $colArr[i] . " WHERE  id = " . $i;
				
				Executer($h,$query);
			
				}
			}
			
			
			function Executer($h,$q){
			
				$stmt = $h->prepare($q);
				$stmt->execute();	
			}
		
			
			
		?>